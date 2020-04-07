import { observable, action, computed, runInAction, reaction, toJS } from 'mobx';
import { SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import { SetActivityProps, createAttnde } from '../common/util/util';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const LIMIT = 2;

export default class ActivityStore {
    /* Rooot yolu tanımlaması adminlik içinde bu şekilde düzenlenir büyük ihtimal :) */
    rootStore: RootStore;
    /**
     *For Sign İn
     */
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        reaction(
            () => this.predicate.keys(),
            () => {
                this.page = 0;
                this.activityRegistry.clear();
                this.loadActivities();
            }

        )

    }

    @observable activityRegistry = new Map();
    @observable activity: IActivity | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';
    @observable loading = false;
    @observable.ref hubConneection: HubConnection | null = null;
    @observable activityCount = 0;
    @observable page = 0;
    @observable predicate = new Map();

    @action setPredicate = (predicate: string, value: string | Date) => {
        this.predicate.clear();
        if (predicate !== 'all') {
            this.predicate.set(predicate, value);
        }
    }
    @computed get axiosParams() {
        const params = new URLSearchParams();
        params.append('limit', String(LIMIT));
        params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
        this.predicate.forEach((value, key) => {
            if (key === 'startDate') {
                params.append(key, value.toISOString())
            } else {
                params.append(key, value)
            }
        })
        return params
    }

    @computed get totalPages() {
        return Math.ceil(this.activityCount / LIMIT);
    }
    @action setPage = (page: number) => {
        this.page = page;
    }

    @action createHubConnection = (activityId: string) => {
        this.hubConneection = new HubConnectionBuilder()
            .withUrl('http://localhost:5000/chat', {
                accessTokenFactory: () => this.rootStore.commonStore.token!
            }).configureLogging(LogLevel.Information)
            .build();

        this.hubConneection
            .start()
            .then(() => console.log(this.hubConneection!.state))
            .then(() => {
                console.log('Attempting To join  gorup');
                this.hubConneection!.invoke('AddToGroup', activityId);
            })
            .catch(error => console.log('Error establishing connection:', error));
        this.hubConneection.on('ReceiveComment', comment => { // controller async method ile aynı isimde olması lazım
            runInAction(() => {
                this.activity!.comments.push(comment);

            })
        })
        this.hubConneection.on('Send', message => {
            toast.info(message);
        })
    };
    @action stopHubConnection = () => {
        this.hubConneection!.invoke('RemoveFromGroup', this.activity!.activityId)
            .then(() => {
                this.hubConneection!.stop();
            })
            .then(() => console.log('Connection Stopped'))
            .catch(err => console.log(err))
    }

    @action addComment = async (values: any) => {
        values.ActivityId = this.activity!.activityId;
        try {
            //controller ile aynı isimde olması lazım
            await this.hubConneection!.invoke('SendComment', values)
        } catch (error) {
            console.log(error)
        }
    }


    @computed get activitiesByDate() {
        return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()))
    }

    groupActivitiesByDate(activities: IActivity[]) {
        const sortedActivities = activities.sort(
            (a, b) => a.date.getTime() - b.date.getTime()
        )
        return Object.entries(sortedActivities.reduce((activities, activity) => {
            const date = activity.date.toISOString().split('T')[0];
            activities[date] = activities[date] ? [...activities[date], activity] : [activity];
            return activities;
        }, {} as { [key: string]: IActivity[] }));
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activitiesEnvlope = await agent.Activities.list(this.axiosParams);
            const { activities, activityCount } = activitiesEnvlope;
            const user = this.rootStore.userStore.user!;
            runInAction('loading activities', () => {
                activities.forEach(activity => {
                    SetActivityProps(activity, user);
                    this.activityRegistry.set(activity.activityId, activity);
                });
                this.activityCount = activityCount;
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction('load activities error', () => {
                this.loadingInitial = false;
            })
        }
    };

    @action loadActivity = async (activityId: string) => {
        let activity = this.getActivity(activityId);
        if (activity) {
            this.activity = activity;
            return toJS(activity);
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(activityId);
                runInAction('getting activity', () => {
                    SetActivityProps(activity, this.rootStore.userStore.user!)
                    this.activity = activity;
                    this.activityRegistry.set(activity.activityId, activity);
                    this.loadingInitial = false;
                })
                return activity;
            } catch (error) {
                runInAction('get activity error', () => {
                    this.loadingInitial = false;
                })
                console.log(error);
            }
        }
    }

    @action clearActivity = () => {
        this.activity = null;
    }

    getActivity = (activityId: string) => {
        return this.activityRegistry.get(activityId);
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            const attende = createAttnde(this.rootStore.userStore.user!);
            attende.isHost = true;
            let attendees = [];
            attendees.push(attende);
            activity.attendees = attendees;
            activity.comments = [];
            activity.isHost = true;
            runInAction('create activity', () => {
                this.activityRegistry.set(activity.activityId, activity);
                this.submitting = false;
            })
            history.push(`/activities/${activity.activityId}`)
        } catch (error) {
            runInAction('create activity error', () => {
                this.submitting = false;
            })
            toast.error('Problem submitting data');
            console.log(error.response);
        }
    };

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction('editing activity', () => {
                this.activityRegistry.set(activity.activityId, activity);
                this.activity = activity;
                this.submitting = false;
            })
            history.push(`/activities/${activity.activityId}`)
        } catch (error) {
            runInAction('edit activity error', () => {
                this.submitting = false;
            })
            toast.error('Problem submitting data');
            console.log(error);
        }
    };

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, activityId: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Activities.delete(activityId);
            runInAction('deleting activity', () => {
                this.activityRegistry.delete(activityId);
                this.submitting = false;
                this.target = '';
            })
        } catch (error) {
            runInAction('delete activity error', () => {
                this.submitting = false;
                this.target = '';
            })
            console.log(error);
        }
    }

    @action attendActivity = async () => {
        const attendee = createAttnde(this.rootStore.userStore.user!);
        this.loading = true;
        try {
            await agent.Activities.attend(this.activity!.activityId)
            runInAction(() => {
                if (this.activity) {
                    this.activity.attendees.push(attendee);
                    this.activity.isGoing = true;
                    this.activityRegistry.set(this.activity.activityId, this.activity);
                    this.loading = false;
                }
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })

            toast.error(error);
        }

    }
    @action cancelAttendance = async () => {
        this.loading = true;

        try {
            await agent.Activities.unattend(this.activity!.activityId)
            runInAction(() => {
                if (this.activity) {
                    this.activity.attendees = this.activity.attendees
                        .filter(a => a.username !== this.rootStore.userStore.user!.username);
                    this.activity.isGoing = false;
                    this.activityRegistry.set(this.activity.activityId, this.activity);
                    this.loading = false;
                }
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
            toast.error(error);
        }




    }
}


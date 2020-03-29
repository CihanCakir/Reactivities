import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';


configure({ enforceActions: 'always' });

export class ActivityStore {
    @observable activityRegistry = new Map()

    @observable activity: IActivity | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate() {  // tarihe  göre geçmişten bugüne  // Map ten arrraye dönüştürmek ii
        // console.log(this.groupActivitiesByDate(Array.from(this.activityRegistry.values())))
        return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()))
    }
    groupActivitiesByDate(activities: IActivity[]) {
        const sortedActivities = activities.sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
        )
        // Tarihi Başa almamız sağladık aynı yöntemi fiyatlar içinde yapabiliriz.
        return Object.entries(sortedActivities.reduce((activities, activity) => {
            const date = activity.date.split('T')[0];
            activities[date] = activities[date] ? [...activities[date], activity] : [activity]; return activities;
        }, {} as { [key: string]: IActivity[] }));
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction('Loading Activities', () => {
                activities.forEach(activity => {
                    activity.date = activity.date.split('.')[0]
                    this.activityRegistry.set(activity.activityId, activity);
                });
                this.loadingInitial = false;
            })
            console.log(this.groupActivitiesByDate(activities));
        } catch (error) {
            runInAction('load Activities ERROR', () => {
                this.loadingInitial = false;
            })
            console.log(error);
        }
    };


    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction('Editing Activity', () => {
                this.activityRegistry.set(activity.activityId, activity);
                this.activity = activity;
                this.submitting = false;
            })

        } catch (error) {
            runInAction('Editin Activity ERROR', () => {
                this.submitting = false;
            });

            console.log(error);
        }
    }

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, activityId: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Activities.delete(activityId);
            runInAction('Delete Activity', () => {
                this.activityRegistry.delete(activityId);
                this.submitting = false;
                this.target = '';
            })

        } catch (error) {
            runInAction('Delete Activity ERROR', () => {
                this.submitting = false;
                this.target = '';
            })

            console.log(error);

        }

    }
    @action loadActivity = async (activityId: string) => {
        let activity = this.getActivity(activityId);
        if (activity) {
            this.activity = activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(activityId);
                runInAction('Getting Activity', () => {
                    this.activity = activity;
                    this.loadingInitial = false;
                })

            } catch (error) {
                runInAction('Getting Activity ERROR', () => {
                    this.loadingInitial = false;
                })
                console.log(error)
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
            runInAction('Create Activity', () => {
                this.activityRegistry.set(activity.activityId, activity);
                this.submitting = false;
            })


        } catch (error) {
            runInAction('Create Activity ERROR', () => {
                this.submitting = false;
            })

            console.log(error);
        }

    }

    @action openCreateForm = () => {
        this.activity = null;
    }


    @action openEditForm = (activityId: string) => {
        this.activity = this.activityRegistry.get(activityId);
    }
    @action cancelSelectedActivity = () => {
        this.activity = null;

    }
    @action cancelFormOpen = () => {
    }


    @action selectActivity = (activityId: string) => {
        this.activity = this.activityRegistry.get(activityId)
    }
}

export default createContext(new ActivityStore())
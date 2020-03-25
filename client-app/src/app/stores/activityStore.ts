import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';


configure({ enforceActions: 'always' });

export class ActivityStore {
    @observable activityRegistry = new Map()

    @observable activities: IActivity[] = [];
    @observable selectedActivity: IActivity | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate() {  // tarihe  göre geçmişten bugüne  // Map ten arrraye dönüştürmek ii
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
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
                this.selectedActivity = activity;
                this.editMode = false;
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
    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            runInAction('Create Activity', () => {
                this.activityRegistry.set(activity.activityId, activity);
                this.editMode = false;
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
        this.editMode = true;
        this.selectedActivity = undefined;
    }


    @action openEditForm = (activityId: string) => {
        this.selectedActivity = this.activityRegistry.get(activityId);
        this.editMode = true;
    }
    @action cancelSelectedActivity = () => {
        this.selectedActivity = undefined;

    }
    @action cancelFormOpen = () => {
        this.editMode = false;
    }


    @action selectActivity = (activityId: string) => {
        this.selectedActivity = this.activityRegistry.get(activityId)
        this.editMode = false;
    }
}

export default createContext(new ActivityStore())
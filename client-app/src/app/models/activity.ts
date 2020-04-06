export interface IActivitiesEnvelope {
    activities: IActivity[];
    activityCount: number;
}


export interface IActivity {
    activityId: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
    isGoing: boolean;
    isHost: boolean;
    attendees: IAttendee[];
    comments: IComment[];
}

export interface IActivityFormValues extends Partial<IActivity> {
    time?: Date;
}

export interface IComment {
    id: string;
    createdAt: Date;
    body: string;
    username: string;
    displayName: string;
    image: string;
}


export class ActivityFormValues implements IActivityFormValues {
    activityId?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date?: Date = undefined;
    time?: Date = undefined;
    city: string = '';
    venue: string = '';

    constructor(init?: IActivityFormValues) {
        if (init && init.date) {
            init.time = init.date;
        }
        Object.assign(this, init);
    }
}

export interface IAttendee {
    username: string;
    displayName: string;
    image: string;
    isHost: boolean;
    following?: boolean;
}
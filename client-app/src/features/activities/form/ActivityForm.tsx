import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';

interface DetailParams {
    activityId: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const activityStore = useContext(ActivityStore);
    const
        {
            clearActivity,
            editActivity,
            createActivity,
            submitting,
            activity: initialFormState,
            loadActivity
        } = activityStore;



    ///  İS Working update refresh and still activity stand
    const [activity, setActivity] = useState<IActivity>({
        activityId: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });


    useEffect(() => {
        if (match.params.activityId && activity.activityId.length === 0) {
            loadActivity(match.params.activityId).then(() => initialFormState && setActivity(initialFormState))
        }
        return (() => {
            clearActivity()
        })
    }, [loadActivity, match.params.activityId, clearActivity, initialFormState, activity.activityId.length])

    const handleSubmit = () => {
        if (activity.activityId.length === 0) {
            let newActivity = {
                ...activity,
                activityId: uuid()
            }
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.activityId}`));
        } else {
            editActivity(activity).then(() => history.push(`/activities/${activity.activityId}`));
        }
    };

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // console.log(event.target.value);
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value })
    }
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}  >
                <Form.Input onChange={handleInputChange} name='title' placeholder='Title' value={activity.title} required />
                <Form.TextArea onChange={handleInputChange} name='description' rows={2} placeholder='Description' value={activity.description} required />
                <Form.Input onChange={handleInputChange} name='category' placeholder='Category' value={activity.category} required />
                <Form.Input onChange={handleInputChange} name='date' type='datetime-local' placeholder='Date' value={activity.date} required />
                <Form.Input onChange={handleInputChange} name='city' placeholder='City' value={activity.city} required />
                <Form.Input onChange={handleInputChange} name='venue' placeholder='Venue' value={activity.venue} required />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={() => history.push(`/activities/${activity.activityId}`)} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}
export default observer(ActivityForm);
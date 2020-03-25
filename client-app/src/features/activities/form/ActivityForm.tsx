import React, { useState, FormEvent, useContext } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
interface IProps {
    activity: IActivity;
}
const ActivityForm: React.FC<IProps> = ({ activity: initialFormState }) => {
    const activityStore = useContext(ActivityStore);
    const { editActivity, createActivity, submitting, cancelFormOpen } = activityStore;

    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState
        } else {
            return {
                activityId: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            };
        }
    };

    const [activity, setActivity] = useState<IActivity>(initializeForm);


    const handleSubmit = () => {
        if (activity.activityId.length === 0) {
            let newActivity = {
                ...activity,
                activityId: uuid()
            }
            createActivity(newActivity);
        } else {
            editActivity(activity);
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
                <Button onClick={cancelFormOpen} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}
export default observer(ActivityForm);
import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
//import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';

import { category } from '../../../app/common/options/categoryOptions';
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
        date: null,
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

    // const handleSubmit = () => {
    //     if (activity.activityId.length === 0) {
    //         let newActivity = {
    //             ...activity,
    //             activityId: uuid()
    //         }
    //         createActivity(newActivity).then(() => history.push(`/activities/${newActivity.activityId}`));
    //     } else {
    //         editActivity(activity).then(() => history.push(`/activities/${activity.activityId}`));
    //     }
    // };

    const handleFinalFormSubmit = (values: any) => {
        console.log(values)
    }


    // const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     // console.log(event.target.value);
    //     const { name, value } = event.currentTarget;
    //     setActivity({ ...activity, [name]: value })
    // }
    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Field
                                    name='title'
                                    placeholder='Title'
                                    value={activity.title}
                                    component={TextInput}
                                />
                                <Field
                                    name='description'
                                    placeholder='Description'
                                    rows={3}
                                    value={activity.description}
                                    component={TextAreaInput}
                                />
                                <Field
                                    component={SelectInput}
                                    options={category}
                                    name='category'
                                    placeholder='Category'
                                    value={activity.category}
                                />
                                <Form.Group widths='equal'>
                                    <Field
                                        component={DateInput}
                                        name='date'
                                        date={true}
                                        placeholder='Date'
                                        value={activity.date!} />
                                    <Field
                                        component={DateInput}
                                        name='time'
                                        time={true}
                                        placeholder='time'
                                        value={activity.date!} />
                                </Form.Group>
                                <Field
                                    component={TextInput}
                                    name='city'
                                    placeholder='City'
                                    value={activity.city} />
                                <Field
                                    component={TextInput}
                                    name='venue'
                                    placeholder='Venue'
                                    value={activity.venue} />
                                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                                <Button onClick={() => history.push(`/activities/${activity.activityId}`)} floated='right' type='button' content='Cancel' />
                            </Form>
                        )}
                    />

                </Segment>
            </Grid.Column>
            <Grid.Column width={6}>

            </Grid.Column>
        </Grid>
    )
}
export default observer(ActivityForm);
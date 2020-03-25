import React, { useContext } from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom';



// <Image src='/images/wireframe/short-paragraph.png' />
const ActivityList: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const { activitiesByDate, deleteActivity, submitting, target } = activityStore;
    return (
        <Segment clearing>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.activityId}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button
                                    as={Link} to={`/activities/${activity.activityId}`}
                                    //onClick={() => selectActivity(activity.activityId)}
                                    floated='right'
                                    content='View'
                                    color='blue' />
                                <Button
                                    name={activity.activityId}
                                    loading={target === activity.activityId && submitting}
                                    onClick={(e) => deleteActivity(e, activity.activityId)}
                                    floated='right'
                                    content='Delete'
                                    color='red' />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}


            </Item.Group>
        </Segment>
    )
}

export default observer(ActivityList);
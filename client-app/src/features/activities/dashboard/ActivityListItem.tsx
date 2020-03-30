import React from 'react'
import { Item, Button, Label, Segment, Icon } from 'semantic-ui-react'
//import ActivityStore from '../../../app/stores/activityStore';
//import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom';
import { IActivity } from '../../../app/models/activity';
import { format } from 'date-fns';
const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
    // const activityStore = useContext(ActivityStore);
    //const { deleteActivity, submitting, target } = activityStore;
    // style eklemek için segment group içerisine alıyoruz

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item key={activity.activityId}>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Description>
                                Hosted By Jerico
                            </Item.Description>


                            <Item.Extra>
                                {/* <Button
                        name={activity.activityId}
                        loading={target === activity.activityId && submitting}
                        onClick={(e) => deleteActivity(e, activity.activityId)}
                        floated='right'
                        content='Delete'
                        color='red' />*/}
                                <Label basic content={activity.category} />
                            </Item.Extra>

                        </Item.Content>
                    </Item>
                </Item.Group>

            </Segment>
            <Segment >
                <Icon name='clock' /> {format(activity.date!, 'h:mm a')}

                <Icon name='marker' /> {activity.venue}, {activity.city}
            </Segment>
            <Segment secondary> Attendes Will go HERE</Segment>
            <Segment clearing>
                <span> {activity.description} </span>
                <Button
                    as={Link} to={`/activities/${activity.activityId}`}
                    //onClick={() => selectActivity(activity.activityId)}
                    floated='right'
                    content='View'
                    color='blue' />
            </Segment>
        </Segment.Group>

    )
}

export default ActivityListItem
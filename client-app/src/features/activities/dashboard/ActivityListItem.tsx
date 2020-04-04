import React from 'react'
import { Item, Button, Label, Segment, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { IActivity } from '../../../app/models/activity';
import { format } from 'date-fns';
import ActivityListItemAttendees from './ActivityListItemAttendees';

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
    const host = activity.attendees.filter(x => x.isHost)[0];

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item key={activity.activityId}>
                        <Item.Image
                            size='small'
                            circular
                            src={host.image || '/assets/user.png'}
                            style={{ marginBottom: 7 }} />
                        <Item.Content>
                            <Item.Header as={Link} to={`activities/${activity.activityId}`} >{activity.title}</Item.Header>
                            <Item.Description>Düzenleyen {' '}
                                <Link to={`/profile/${host.username}`}>{host.displayName}</Link> {' '}
                            </Item.Description>

                            {
                                activity.isHost &&

                                <Item.Description>
                                    <Label
                                        basic
                                        color='orange'
                                        content='Etkinlik Sahibisin'
                                    />
                                </Item.Description>
                            }
                            {

                                activity.isGoing && !activity.isHost &&

                                <Item.Description>
                                    <Label
                                        basic
                                        color='green'
                                        content='Etkinliğe Katılıyorsun'
                                    />
                                </Item.Description>
                            }
                            {
                                !activity.isGoing && !activity.isHost &&
                                <Item.Description>
                                    <Label
                                        basic
                                        color='red'
                                        content='Etkinliğe Katılmıyorsun'
                                    />
                                </Item.Description>
                            }


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
            <Segment secondary>
                <ActivityListItemAttendees
                    attendees={activity.attendees}
                />
            </Segment>
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
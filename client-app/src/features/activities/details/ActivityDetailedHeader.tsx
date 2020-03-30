import React from 'react'
import { Segment, Item, Header, Image, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { format } from 'date-fns';
interface IProps {
    activity: IActivity
}

const ActivityDetailedHeader: React.FC<IProps> = ({ activity }) => {
    const activityImageStyle = {
        filter: 'brightness(30%)'
    }

    const activityImageTextStyle = {
        position: 'absolute',
        bottom: '5%',
        left: '5%',
        width: '100%',
        height: 'auto',
        color: 'white'
    }


    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
                <Segment basic style={activityImageTextStyle} >
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={`${activity.title}`}
                                    style={{ color: 'white' }}
                                />
                                <p> {format(activity.date!, 'eeee do MMMM')}  </p>
                                <p>
                                    Hosted By <strong>Cihan</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal' >Join Activity</Button>
                <Button>Cancel Attendace</Button>
                <Button as={Link} to={`/manage/${activity.activityId}`} color='orange' floated='right'>
                    Manage Event
        </Button>
            </Segment>
        </Segment.Group>
    )
}


export default observer(ActivityDetailedHeader) 
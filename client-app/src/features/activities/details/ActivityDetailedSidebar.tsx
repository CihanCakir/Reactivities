import React, { Fragment } from 'react'
import { Segment, List, Item, Label, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { IAttendee } from '../../../app/models/activity'
import { observer } from 'mobx-react-lite'

interface IProps {
    attendees: IAttendee[]
}



const ActivityDetailedSidebar: React.FC<IProps> = ({ attendees }) => {


    return (
        <Fragment>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                {attendees.length} {attendees.length === 1 ? 'Person' : 'People'}
            </Segment>
            <Segment attached>

                <List relaxed divided>

                    {attendees.map((atteendee) => (
                        <Item key={atteendee.username} style={{ position: 'relative' }}>
                            {atteendee.isHost && <Label
                                style={{ position: 'absolute' }}
                                color='orange'
                                ribbon='right'
                            >
                                Organizatör
                 </Label>}
                            <Image size='tiny' src={atteendee.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='h3'>
                                    <Link to={`/profile/${atteendee.username}`}>{atteendee.displayName}</Link>
                                </Item.Header>
                                <Item.Extra style={{ color: 'orange' }}>Takipte</Item.Extra>
                            </Item.Content>
                        </Item>

                    ))}
                </List>

            </Segment>
        </Fragment>
    )
}

export default observer(ActivityDetailedSidebar);

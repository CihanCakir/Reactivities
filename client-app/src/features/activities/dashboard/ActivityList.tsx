import React, { useContext, Fragment } from 'react'
import { Item, Label } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite'
//import { Link } from 'react-router-dom';
import ActivityListItem from './ActivityListItem';



// <Image src='/images/wireframe/short-paragraph.png' />
const ActivityList: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const { activitiesByDate } = activityStore;
    return (
        <Fragment>
            {activitiesByDate.map(([group, activities]) => (
                <Fragment key={group}>
                    <Label key={group} size='large' color='black' >
                        {group}
                    </Label>

                    <Item.Group divided>
                        {activities.map(activity => (
                            <ActivityListItem key={activity.activityId} activity={activity} />
                        ))}


                    </Item.Group>

                </Fragment>
            ))}
        </Fragment>

    )
}

export default observer(ActivityList);
import React, { useContext, Fragment } from 'react'
import { Item, Label } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
//import { Link } from 'react-router-dom';
import ActivityListItem from './ActivityListItem';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { format } from 'date-fns';


// <Image src='/images/wireframe/short-paragraph.png' />
const ActivityList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { activitiesByDate } = rootStore.activityStore;
    return (
        <Fragment>
            {activitiesByDate.map(([group, activities]) => (
                <Fragment key={group}>
                    <Label key={group} size='large' color='black' >
                        {format(group, 'eeee do MMMM')}
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
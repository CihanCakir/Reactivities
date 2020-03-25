import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList'
import { observer } from 'mobx-react-lite'
import ActivityStore from '../../../app/stores/activityStore';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';


// import ActivityDetails from '../details/ActivityDetails'
// import ActivityForm from '../form/ActivityForm'

const ActivityDashboard: React.FC = () => {
    // const activityStore = useContext(ActivityStore)
    // const { editMode, activity } = activityStore; 
    const activityStore = useContext(ActivityStore);

    // Get ALl Activities
    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    if (activityStore.loadingInitial) return <LoadingComponent content='loading Activities ...' />
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>





                {/* {activity && !editMode && (<ActivityDetails />)}
                {editMode &&
                    <ActivityForm
                        key={activity && activity.activityId || 0}
                        activity={activity!}
                    />} */}
            </Grid.Column>
        </Grid>
    )
}
export default observer(ActivityDashboard)
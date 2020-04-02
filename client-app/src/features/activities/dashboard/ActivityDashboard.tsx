import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList'
import { observer } from 'mobx-react-lite'
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';


// import ActivityDetails from '../details/ActivityDetails'
// import ActivityForm from '../form/ActivityForm'

const ActivityDashboard: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const { loadActivities, loadingInitial } = rootStore.activityStore;

    // Get ALl Activities
    useEffect(() => {
        loadActivities();
    }, [loadActivities]);

    if (loadingInitial) return <LoadingComponent content='loading Activities ...' />
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
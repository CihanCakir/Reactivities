import React, { useContext } from 'react'
import { RootStoreContext } from '../../app/stores/rootStore'
import { Tab, Grid } from 'semantic-ui-react';

const ProfileFollowers = () => {
    const rootStore = useContext(RootStoreContext);
    const { profile } = rootStore.profileStore;
    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}></Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}

export default ProfileFollowers

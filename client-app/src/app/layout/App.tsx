import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react';
//import { cars } from './demo';
//import { CarItem } from './CarItem';

import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';


import { LoadingComponent } from './LoadingComponent';
import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';

const App = () => {

  const activityStore = useContext(ActivityStore);









  // Get ALl Activities
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content='loading Activities ...' />




  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
}



export default observer(App);


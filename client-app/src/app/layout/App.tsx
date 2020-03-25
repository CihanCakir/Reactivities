import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

//import { LoadingComponent } from './LoadingComponent';
// import ActivityStore from '../stores/activityStore';

const App: React.FC<RouteComponentProps> = ({ location }) => {



  return (
    <Fragment>
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Route exact path='/activities' component={ActivityDashboard} />
            <Route path='/activities/:activityId' component={ActivityDetails} />
            {/* Eğer Ki bir route 2 işi bir component yapacaksa path dizi olarak tanımlanır aşağıda edit ve create aynı componentta olduğu  gibi */}
            <Route
              key={location.key}
              path={['/createActivity', '/manage/:activityId']} component={ActivityForm} />

          </Container>
        </Fragment>
      )} />

    </Fragment>
  );
}



export default withRouter(observer(App));


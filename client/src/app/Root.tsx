import * as React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { Switch } from 'react-router';

import { AppReduxState, REDUCER_NAME__APP } from './reducer';
import asyncComponent from './components/AsyncComponent';
import { RootDispatchProps, RootStateProps, RootProps } from './types';
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute';
import Centered from './components/Centered/Centered.component';
import Header from './components/Header';
import RoomsRoutes from './routes/Rooms/async';
import CreateRoomRoutes from './routes/CreateRoom/async';
import RoomRoutes from './routes/Room';
import EditRoomRoutes from './routes/EditRoom/async';
import ChatRoomRoutes from './routes/ChatRoom/async';
import Footer from './components/Footer/Footer.component';
import AsyncComponent from './components/AsyncComponent';
import { AuthConsumer, AuthProvider } from './routes/Authentication/AuthContext';

function Root(props: RootProps) {
  const {loading, error, backendHost, classes} = props;

  if (loading) {
    return <div className="loader spin"/>;
  }
  if (error) {
    return <div>[ERROR] {error.title}: {error.description}</div>;
  }

  const loggedInRoutes = (
    <RestrictedRoute path={`/`} isLoggedIn={true} component={() => (
      <div className={classes && classes.wrapper}>
        <Centered>
          <Header/>
        </Centered>
        <span className={classes && classes.mainWrapper}>
          <Route exact={true} path={'/rooms'} component={AsyncComponent(RoomsRoutes)}/>
          <Switch>
            <Route exact={true} path={'/rooms/new'} component={AsyncComponent(CreateRoomRoutes)}/>
            <Route exact={true} path={'/rooms/:id'} component={AsyncComponent(RoomRoutes)}/>
            <Route path={'/rooms/:id/edit'} component={AsyncComponent(EditRoomRoutes)}/>
            <Route path={'/rooms/:id/chat'} component={AsyncComponent(ChatRoomRoutes)}/>
          </Switch>
          </span>
          <span className={classes && classes.footerWrapper}>
            <Footer/>
          </span>
      </div>
    )}/>
  );

  const notLoggedInRoutes = <Route path={'*'}
                                   component={asyncComponent(async () => await import('./routes/Authentication/Login'))}/>;

  return (
    <div className="app-main">
      <AuthProvider host={backendHost}>
        <AuthConsumer>
          {({loggedIn}) => (
            <Switch>
              {loggedIn ? loggedInRoutes : notLoggedInRoutes}
            </Switch>
          )}
        </AuthConsumer>
      </AuthProvider>

      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates={true}
        position="top-center"
        transitionIn="bounceInDown"
        transitionOut="bounceOutUp"
        progressBar={true}
      />
    </div>
  );
}

const mapStateToProps = (state: any): RootStateProps => {
  const {loading, error, config: {backendHost}}: AppReduxState = state[REDUCER_NAME__APP];
  return {
    loading,
    error,
    backendHost,
  };
};

const mapDispatchToProps = {};
export default connect<RootStateProps, RootDispatchProps, any>(mapStateToProps, mapDispatchToProps)(Root);

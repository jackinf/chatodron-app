import * as React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import ReduxToastr from "react-redux-toastr";
import {Switch} from "react-router";
import withStyles, {StyledComponentProps, StyleRules} from "@material-ui/core/styles/withStyles";
import {Theme} from "@material-ui/core";

import TemtHeader from '../components/Header';
import Footer from '../components/Footer';
import {AppComponentDispatchProps, AppComponentStateProps} from './App.component';
import {AppReduxState, REDUCER_NAME__APP} from "./App.reducer";
import {routePaths} from "../constants/api.constants";
import asyncComponent from "../helpers/AsyncComponent";
import {ErrorWrapper} from "../viewModels/base";
import RoomsRoutes from "./routes/Rooms";
import RoomRoutes from "./routes/Room";
import DemoRoutes from "./routes/Demo";
import Centered from '../components/Centered';

const RestrictedRoute = ({component: Component, ...rest}: any) =>
  (
    <Route {...rest} render={(props: any) =>
      rest.isLoggedIn
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: routePaths.login,
            state: {from: props.location}
          }}
        />}
    />
  );

const Main = withStyles((theme: Theme): StyleRules => ({
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column"
  },

  mainWrapper: {
    flex: 1
  },

  footerWrapper: {
    height: theme.spacing.unit * 7
  }
}))(({ classes }: StyledComponentProps) => (
  <div className={classes && classes.wrapper}>
    <Centered>
      <TemtHeader />
    </Centered>
    <span className={classes && classes.mainWrapper}>
      <RoomsRoutes />
      <RoomRoutes />
      <DemoRoutes />
    </span>
    <span className={classes && classes.footerWrapper}>
      <Footer/>
    </span>
  </div>
));

export interface AppComponentStateProps {
  loading: boolean;
  error?: ErrorWrapper;
  isLoggedIn: boolean;
}
export interface AppComponentDispatchProps {}
class AppComponent extends React.Component<AppComponentStateProps & AppComponentDispatchProps> {

  render() {
    const {loading, error, isLoggedIn} = this.props;

    if (loading) {
      return  <div className="loader spin" /> ;
    }
    if (isLoggedIn && error) {
      return <div>[ERROR] {error.title}: {error.description}</div>
    }

    return (
      <div className={`app-main ${!isLoggedIn ? '' : ''}`}>
        <Switch>
          {isLoggedIn
            ? <RestrictedRoute path={`/`} isLoggedIn={isLoggedIn} component={Main}/>
            : <Route path={'*'} component={asyncComponent(async () => await import('./routes/Auth'))}/>}
        </Switch>

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
}

const mapStateToProps = (state: any): AppComponentStateProps => {
  const currentState: AppReduxState = state[REDUCER_NAME__APP];
  return {
    loading: currentState.loading,
    error: currentState.error,
    isLoggedIn: true // TODO: implement
  }
};

const mapDispatchToProps = {};
export default connect<AppComponentStateProps, AppComponentDispatchProps, any>(mapStateToProps, mapDispatchToProps)(AppComponent)

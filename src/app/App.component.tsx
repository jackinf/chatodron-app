import * as React from 'react';
import {MuiThemeProvider} from 'material-ui/styles';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import ReduxToastr from "react-redux-toastr";

import TemtHeader from '../components/Header';
import Footer from '../components/Footer';
import {AppComponentDispatchProps, AppComponentStateProps} from './App.component';
import {AppReduxState, REDUCER_NAME__APP} from "./App.reducer";
import {routePaths} from "../constants/api.constants";
import asyncComponent from "../helpers/AsyncComponent";
import {ErrorWrapper} from "../viewModels/base";
import {Switch} from "react-router";
import {injectAsyncReducer} from "../createAppStore";
import {store} from "../index";

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

const Main = () => (
  <div className={`app-container`}>
    <TemtHeader />
    <h2>Chatodron</h2>
    <Route exact={true} path={'/rooms'}
       component={asyncComponent(async () => {
         const reducer = await import('./routes/Rooms/Rooms.reducer');
         injectAsyncReducer(store, reducer.REDUCER_NAME__ROOMS, reducer.default);
         return await import('./routes/Rooms/Rooms.component');
       })}
    />
    <Footer/>
  </div>
);

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
      <MuiThemeProvider>
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
      </MuiThemeProvider>
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

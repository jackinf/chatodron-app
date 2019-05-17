import * as React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ReduxToastr from "react-redux-toastr";
import { Switch } from "react-router";

import {AppReduxState, REDUCER_NAME__APP} from "./reducer";
import asyncComponent from "../helpers/AsyncComponent";
import { RootDispatchProps, RootStateProps, RootProps } from './types';
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute';
import Main from './components/Main/Main';

class Root extends React.Component<RootProps> {

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

const mapStateToProps = (state: any): RootStateProps => {
  const currentState: AppReduxState = state[REDUCER_NAME__APP];
  return {
    loading: currentState.loading,
    error: currentState.error,
    isLoggedIn: true // TODO: implement
  }
};

const mapDispatchToProps = {};
export default connect<RootStateProps, RootDispatchProps, any>(mapStateToProps, mapDispatchToProps)(Root)

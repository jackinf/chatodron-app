import { Redirect, Route } from 'react-router';
import { routePaths } from '../../../constants/api.constants';
import * as React from 'react';

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

export default RestrictedRoute;
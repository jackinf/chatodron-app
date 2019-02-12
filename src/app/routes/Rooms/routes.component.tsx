import * as React from "react";
import {Route} from "react-router";

import asyncComponent from "../../../helpers/AsyncComponent";
import {injectAsyncReducer} from "../../../createAppStore";
import {store} from "../../../index";

export default () => (
  <Route exact={true} path={'/rooms'} component={asyncComponent(async () => {
    const reducer = await import('./Rooms.reducer');
    injectAsyncReducer(store, reducer.REDUCER_NAME__ROOMS, reducer.default);
    return await import('./Rooms.component');
  })}
  />
)

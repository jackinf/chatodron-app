import * as React from "react";
import {Route} from "react-router";

import asyncComponent from "../../components/AsyncComponent";
import {injectAsyncReducer} from "../../../createAppStore";
import {store} from "../../../index";

// export default () => (
//   <Route exact={true} path={'/rooms'} component={asyncComponent(async () => {
//     const reducer = await import('./reducer');
//     injectAsyncReducer(store, reducer.REDUCER_NAME__ROOMS, reducer.default);
//     return await import('./Rooms');
//   })}
//   />
// )

export default async () => {
  const reducer = await import('./reducer');
  injectAsyncReducer(store, reducer.REDUCER_NAME__ROOMS, reducer.default);
  return await import('./Rooms');
}

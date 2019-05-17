import React from 'react';
import { Route } from "react-router-dom";

import AsyncComponent from "../../../helpers/AsyncComponent";
import { injectAsyncReducer } from "../../../createAppStore";
import { store } from "../../../index";

// export default () => (
//   <Route exact={true} path={'/rooms/:id'} component={AsyncComponent(async () => {
//     const reducer = await import('./reducer');
//     injectAsyncReducer(store, reducer.REDUCER_NAME__ROOM, reducer.default);
//     return await import('./Room');
//   })}/>
// );

export default async () => {
  const reducer = await import('./reducer');
  injectAsyncReducer(store, reducer.REDUCER_NAME__ROOM, reducer.default);
  return await import('./Room');
}
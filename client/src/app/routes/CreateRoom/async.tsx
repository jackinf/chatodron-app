import React from 'react';
import { Route } from 'react-router-dom';

import AsyncComponent from "../../components/AsyncComponent";
import { injectAsyncReducer } from "../../../createAppStore";
import { store } from "../../../index";

// export default () => (
//   <Route exact={true} path={'/rooms/new'} component={AsyncComponent(async () => {
//     const reducer = await import('./reducer');
//     injectAsyncReducer(store, reducer.REDUCER_NAME__CREATE_ROOM, reducer.default);
//     return await import('./CreateRoom');
//   })}/>
// );

export default async () => {
  const reducer = await import('./reducer');
  injectAsyncReducer(store, reducer.REDUCER_NAME__CREATE_ROOM, reducer.default);
  return await import('./CreateRoom');
};
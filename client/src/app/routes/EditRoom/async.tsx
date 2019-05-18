import * as React from 'react';
import AsyncComponent from "../../components/AsyncComponent";
import {injectAsyncReducer} from "../../../createAppStore";
import {Route} from "react-router-dom";
import {store} from "../../../index";

// export default () => (
//   <Route path={'/rooms/:id/edit'} component={AsyncComponent(async () => {
//     const reducer = await import('./reducer');
//     injectAsyncReducer(store, reducer.REDUCER_NAME__EDIT_ROOM, reducer.default);
//     return await import('./EditRoom');
//   })}/>
// );

export default async () => {
  const reducer = await import('./reducer');
  injectAsyncReducer(store, reducer.REDUCER_NAME__EDIT_ROOM, reducer.default);
  return await import('./EditRoom');
};
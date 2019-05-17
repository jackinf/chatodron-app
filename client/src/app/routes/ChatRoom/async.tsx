import React from 'react';
import { Route } from "react-router-dom";

import AsyncComponent from "../../../helpers/AsyncComponent";
import { injectAsyncReducer } from "../../../createAppStore";
import { store } from "../../../index";

// export default () => (
//   <Route path={'/rooms/:id/chat'} component={AsyncComponent(async () => {
//     const reducer = await import('./reducer');
//     injectAsyncReducer(store, reducer.REDUCER_NAME__CHAT_ROOM, reducer.default);
//     return await import('../ChatRoom/ChatRoom');
//   })}/>
// );

export default async () => {
  const reducer = await import('./reducer');
  injectAsyncReducer(store, reducer.REDUCER_NAME__CHAT_ROOM, reducer.default);
  return await import('./ChatRoom');
};

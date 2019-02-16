import * as React from 'react';
import AsyncComponent from "../../../helpers/AsyncComponent";
import {injectAsyncReducer} from "../../../createAppStore";
import {Route, Switch} from "react-router-dom";
import {store} from "../../../index";

export default () => (
  <Switch>
    <Route exact={true} path={'/rooms/new'} component={AsyncComponent(async () => {
      const reducer = await import('./Room.reducer');
      injectAsyncReducer(store, reducer.REDUCER_NAME__ROOM, reducer.default);
      return await import('./Room.create-component');
    })}/>
    <Route exact={true} path={'/rooms/:id'} component={AsyncComponent(async () => {
      const reducer = await import('./Room.reducer');
      injectAsyncReducer(store, reducer.REDUCER_NAME__ROOM, reducer.default);
      return await import('./Room.view-component');
    })}/>
    <Route path={'/rooms/:id/edit'} component={AsyncComponent(async () => {
      const reducer = await import('./Room.reducer');
      injectAsyncReducer(store, reducer.REDUCER_NAME__ROOM, reducer.default);
      return await import('./Room.edit-component');
    })}/>
    <Route path={'/rooms/:id/chat'} component={AsyncComponent(async () => {
      const reducer = await import('./Room.reducer');
      injectAsyncReducer(store, reducer.REDUCER_NAME__ROOM, reducer.default);
      return await import('./Room.chat-component');
    })}/>
  </Switch>
);

import * as React from 'react';
import AsyncComponent from "../../../helpers/AsyncComponent";
import {injectAsyncReducer} from "../../../createAppStore";
import {Route, Switch} from "react-router-dom";
import {store} from "../../../index";

class Room extends React.Component<any> {
  render() {
    return (
      <Switch>
        <Route exact={true} path={'/room/new'}
          component={AsyncComponent(async () => {
            const reducer = await import('./Room.reducer');
            injectAsyncReducer(store, reducer.REDUCER_NAME__ROOM, reducer.default);
            return await import('./Room.create-component');
          })}/>
        <Route path={'/room/:id'}
          component={AsyncComponent(async () => {
            const reducer = await import('./Room.reducer');
            injectAsyncReducer(store, reducer.REDUCER_NAME__ROOM, reducer.default);
            return await import('./Room.edit-component');
          })}/>
      </Switch>
    )
  }
}

export default Room;
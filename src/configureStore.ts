import { applyMiddleware, compose, createStore, Reducer, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import {routerMiddleware} from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import createReducer from "./reducers";

export const history = createBrowserHistory();

// const routeMiddleware = routerMiddleware(history);
const routeMiddleware = routerMiddleware(history);
const middlewares = [routeMiddleware, thunkMiddleware];

const __DEV__ = true; // TODO: get development mode from environments
const asyncReducers: any = { b: () => 2 };

export default function configureStore(initialState: any = {}) { // TODO: use typedef

  // ======================================================
  // Store Enhancers
  // ======================================================
  const windowIfDefined = typeof window === 'undefined' ? null : window as any;
  const enhancers: any[] = [];
  if (__DEV__) {
    const devToolsExtension: any = windowIfDefined && windowIfDefined.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      const ext: any = devToolsExtension({shouldHotReload: false});
      enhancers.push(ext); // correct fix to avoid toastr endless popup
    }
  }

  // ======================================================
  // Store Instantiation
  // ======================================================
  const store = createStore(
    createReducer(asyncReducers, history),
    initialState,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    ));

  return store;
}

export function injectAsyncReducer(store: Store<any>, name: string, asyncReducer: Reducer<any>) { // TODO: Fix anys
  asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(asyncReducers, history));
}

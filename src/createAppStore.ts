import { applyMiddleware, compose, createStore, Reducer, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import combineAppReducers from "./combineAppReducers";

export const history = createBrowserHistory();

const routeMiddleware = routerMiddleware(history);
const middlewares = [routeMiddleware, thunkMiddleware];

const __DEV__ = true; // TODO: get development mode from environments
const asyncReducers: any = { b: () => 2 };

export default function createAppStore(initialState: any = {}) { // TODO: use typedef

  // ======================================================
  // Store Enhancers
  // ======================================================
  const windowIfDefined = typeof window === 'undefined' ? null : window as any;
  const enhancers: any[] = [];
  if (__DEV__) {
    const devToolsExtension: any = windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__;
    if (typeof devToolsExtension === 'function') {
      const ext: any = devToolsExtension({shouldHotReload: false});
      enhancers.push(ext); // correct fix to avoid toastr endless popup
    }
  }

  // ======================================================
  // Store Instantiation
  // ======================================================
  const store = createStore(
    combineAppReducers(asyncReducers, history),
    initialState,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    ));

  return store;
}

export function injectAsyncReducer(store: Store<any>, name: string, asyncReducer: Reducer<any>) { // TODO: Fix anys
  asyncReducers[name] = asyncReducer;
  store.replaceReducer(combineAppReducers(asyncReducers, history));
}

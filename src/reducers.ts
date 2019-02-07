import { combineReducers, Reducer } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { routerReducer } from 'react-router-redux';
// import { routerMiddleware } from 'connected-react-router'
import { i18nReducer } from 'react-redux-i18n';
import {default as authReducer, REDUCER_NAME__APP} from "./app/App.reducer";

const conf: any = {
  // router: connectRouter(history),
  routing: routerReducer,
  form: formReducer,
  i18n: i18nReducer,
  toastr: toastrReducer,
  [REDUCER_NAME__APP]: authReducer
};

export default function createReducer(asyncReducers: Reducer<any>) {
  return combineReducers({
    ...conf,
    ...asyncReducers
  });
}

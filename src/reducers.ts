import { combineReducers, Reducer } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { i18nReducer } from 'react-redux-i18n';
import { History } from "history";
import { connectRouter } from 'connected-react-router'

import {default as authReducer, REDUCER_NAME__APP} from "./app/App.reducer";

const conf: any = {
  form: formReducer,
  i18n: i18nReducer,
  toastr: toastrReducer,
  [REDUCER_NAME__APP]: authReducer
};

export default (asyncReducers: Reducer<any>, history: History) => combineReducers({
  router: connectRouter(history),
  ...conf,
  ...asyncReducers
});

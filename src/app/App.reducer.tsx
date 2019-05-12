import { Action } from 'redux';
import { isType } from 'typescript-fsa';
import { asyncActions as startActions } from './actions/App.start.action';
import {ErrorWrapper} from "../viewModels/base";
import { Config } from './App.types';

export const REDUCER_NAME__APP = 'app';
export interface AppReduxState {
  loading: boolean;
  error?: ErrorWrapper;
  config: Config;
}
const defaultState: AppReduxState = {
  loading: true,
  error: undefined,
  config: {
    backendHost: '',
  }
};
export default (state: AppReduxState = defaultState, action: Action) => {

  // Set or unset user
  if (isType(action, startActions.started)) {
    return {...state, type: action.type};
  }
  if (isType(action, startActions.done)) {
    const { config } = action.payload.result;
    return {...state, type: action.type, loading: false, config};
  }
  if (isType(action, startActions.failed)) {
    return {...state, type: action.type, loading: false, error: action.payload.error};
  }

  return state;
};

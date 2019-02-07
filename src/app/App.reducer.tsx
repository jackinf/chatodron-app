import { Action } from 'redux';
import { isType } from 'typescript-fsa';
import { asyncActions as startActions } from './actions/App.start.action';
import {ErrorWrapper} from "../viewModels/base";

export const REDUCER_NAME__APP = 'app';
export interface AppReduxState {
  loading: boolean;
  error?: ErrorWrapper;
}
const defaultState: AppReduxState = {
  loading: true,
  error: undefined,
};
export default (state: AppReduxState = defaultState, action: Action) => {

  // Set or unset user
  if (isType(action, startActions.started)) {
    return {...state, type: action.type};
  }
  if (isType(action, startActions.done)) {
    return {...state, type: action.type, loading: false};
  }
  if (isType(action, startActions.failed)) {
    return {...state, type: action.type, loading: false, error: action.payload.error};
  }

  return state;
};

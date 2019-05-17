import { Action } from 'redux';
import { isType } from 'typescript-fsa';
import {
  cancel as createCancel,
  submitActions as createSubmitActions
} from './actions/createSingle';
import { ErrorWrapper } from "../../../types/base";

export const REDUCER_NAME__CREATE_ROOM = 'createRoom';

export interface RoomReduxState {
  type?: string;
  errorWrapper?: ErrorWrapper;
  id?: string;
  item?: any;
  loading: boolean;
  messages?: any[]; // todo: define type
}
const defaultState: RoomReduxState = {
  loading: false
};
export default (state: RoomReduxState = defaultState, action: Action): RoomReduxState => {

  if (isType(action, createCancel)) {
    return {...state, type: action.type, loading: false};
  }
  if (isType(action, createSubmitActions.started)) {
    return {...state, type: action.type, loading: true};
  }
  if (isType(action, createSubmitActions.done)) {
    return {...state, type: action.type, loading: false};
  }
  if (isType(action, createSubmitActions.failed)) {
    return {...state, type: action.type, errorWrapper: action.payload.error, loading: false};
  }

  return state;
};

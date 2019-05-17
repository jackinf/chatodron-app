import { Action } from 'redux';
import { isType } from 'typescript-fsa';
import {
  cancel as editCancel,
  startActions as editStartActions,
  submitActions as editSubmitActions
} from './actions/updateSingle';
import { ErrorWrapper } from "../../../types/base";

export const REDUCER_NAME__EDIT_ROOM = 'editRoom';

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

  if (isType(action, editCancel)) {
    return {...state, type: action.type, loading: false, id: undefined};
  }
  if (isType(action, editStartActions.started)) {
    return {...state, type: action.type, loading: true};
  }
  if (isType(action, editStartActions.done)) {
    const { id, item } = action.payload.result;
    return {type: action.type, loading: false, id, item, ...defaultState};
  }
  if (isType(action, editStartActions.failed)) {
    return {...state, type: action.type, loading: false, errorWrapper: action.payload.error};
  }
  if (isType(action, editSubmitActions.started)) {
    return {...state, type: action.type, loading: true};
  }
  if (isType(action, editSubmitActions.done)) {
    return {...state, type: action.type, id: undefined, loading: false};
  }
  if (isType(action, editSubmitActions.failed)) {
    return {...state, type: action.type, errorWrapper: action.payload.error, loading: false};
  }

  return state;
};

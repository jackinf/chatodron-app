import { Action } from 'redux';
import { isType } from 'typescript-fsa';
import {
  cancel as createCancel,
  submitActions as createSubmitActions
} from './actions/Room.create-single.actions';
import {
  cancel as editCancel,
  startActions as editStartActions,
  submitActions as editSubmitActions
} from './actions/Room.udpate-single.actions';
import { ErrorWrapper } from "../../../viewModels/base";

export const REDUCER_NAME__ROOM = 'room';

export interface RoomReduxState {
  type?: string;
  errorWrapper?: ErrorWrapper;
  id?: string;
  item?: any;
  loading: boolean;
}
const defaultState: RoomReduxState = {
  loading: false
};
export default (state: RoomReduxState = defaultState, action: Action): RoomReduxState => {

  // Create actions
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

  // Edit actions
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

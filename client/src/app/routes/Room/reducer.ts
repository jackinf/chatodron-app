import { Action } from 'redux';
import { isType } from 'typescript-fsa';
import {
  startActions as editStartActions,
} from '../EditRoom/actions/updateSingle';
import { ErrorWrapper } from "../../types";

export const REDUCER_NAME__ROOM = 'room';

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

  return state;
};

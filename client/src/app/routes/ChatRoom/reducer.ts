import { Action } from 'redux';
import { ErrorWrapper } from "../../../types/base";
import {
  startActions as getSingleActions
} from './actions/getSingle';
import {
  startActions as getLastNMessages
} from './actions/getLastNMessages';
import { isType } from 'typescript-fsa';

export const REDUCER_NAME__CHAT_ROOM = 'chatRoom';

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

  // Get single
  if (isType(action, getSingleActions.started)) {
    return {...state, type: action.type, loading: true};
  }
  if (isType(action, getSingleActions.done)) {
    const { id, item } = action.payload.result;
    return {type: action.type, loading: false, id, item, ...defaultState};
  }
  if (isType(action, getSingleActions.failed)) {
    return {...state, type: action.type, loading: false, errorWrapper: action.payload.error};
  }

  // Get single
  if (isType(action, getLastNMessages.started)) {
    return {...state, type: action.type, loading: true};
  }
  if (isType(action, getLastNMessages.done)) {
    const {messages} = action.payload.result;
    return {...state, type: action.type, loading: false, messages};
  }

  return state;
};

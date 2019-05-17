import { Action } from 'redux';
import { isType } from 'typescript-fsa';
import { asyncActions as FetchActions } from './actions/getList';
import { ErrorWrapper } from "../../../types/base";
import {
  cancel as deleteCancel,
  startActions as deleteStartActions,
  submitActions as deleteSubmitActions
} from "./actions/deleteSingle";

export const REDUCER_NAME__ROOMS = 'rooms';

export interface RoomsReduxState {
  type?: string;
  loading: boolean;
  error?: ErrorWrapper | null;
  tableData: any;
  pendingDeleteId: string | undefined;
  confirmLoading: boolean;
}
const defaultState: RoomsReduxState = {
  loading: false,
  tableData: {},
  pendingDeleteId: undefined,
  confirmLoading: false
};

export default (state: RoomsReduxState = defaultState, action: Action): RoomsReduxState => {

  // Get list
  if (isType(action, FetchActions.started)) {
    return {...state, type: action.type, loading: true,  error: null};
  }
  if (isType(action, FetchActions.done)) {
    return {...state, type: action.type, loading: false, tableData: action.payload.result.tableData, error: null};
  }
  if (isType(action, FetchActions.failed)) {
    return {...state, type: action.type, loading: false,  error: action.payload.error};
  }

  // Delete actions
  if (isType(action, deleteCancel)) {
    return {...state, type: action.type, confirmLoading: false, pendingDeleteId: undefined};
  }
  if (isType(action, deleteStartActions.started)) {
    return {...state, type: action.type, confirmLoading: true};
  }
  if (isType(action, deleteStartActions.done)) {
    return {...state, type: action.type, confirmLoading: false, pendingDeleteId: action.payload.result.id};
  }
  if (isType(action, deleteStartActions.failed)) {
    return {...state, type: action.type, confirmLoading: false, error: action.payload.error};
  }
  if (isType(action, deleteSubmitActions.started)) {
    return {...state, type: action.type, confirmLoading: true};
  }
  if (isType(action, deleteSubmitActions.done)) {
    return {...state, type: action.type, pendingDeleteId: undefined, confirmLoading: false};
  }
  if (isType(action, deleteSubmitActions.failed)) {
    return {...state, type: action.type, error: action.payload.error, confirmLoading: false};
  }

  return state;
};

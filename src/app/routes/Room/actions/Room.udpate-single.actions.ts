import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';
import { toastr } from 'react-redux-toastr';
import { initialize } from "redux-form";

import { ErrorWrapper } from '../../../../viewModels/base';
import CommonUtilities from "../../../../helpers/CommonUtilities";
import RoomApi from "../../../apis/Room.api";
import { roomFormName } from "../Room.edit-component";
import { RoomReduxState, REDUCER_NAME__ROOM } from "../Room.reducer";

const actionCreator = actionCreatorFactory();

/*
    CANCEL
 */

export const cancel = actionCreator<{}>('ROOM/EDIT/CANCEL');

/*
    START
 */
export const startActions = actionCreator.async<{}, {id: string}, ErrorWrapper>('ROOM/EDIT/START');

export function start(id: string) {
  return async (dispatch: Dispatch<any>, getState: Function) => {

    // TODO: to functional programming
    async function mainAction() {
      dispatch(startActions.started({}));
      const item = await RoomApi.getSingle(id);
      if (!item) {
        throw new ErrorWrapper(`Item with Id ${id} not found`);
      }
      dispatch(initialize(roomFormName, item));
      dispatch(startActions.done({ params: {}, result: {id} }));
    }

    async function catchAction(exception: ErrorWrapper) {
      dispatch(startActions.failed({ params: {}, error: exception }));
      toastr.error('Error', 'Error has occurred'); // TODO: two next lines into 1 helper
      CommonUtilities.scrollToTop();
    }

    await CommonUtilities.tryCatchWrapper(mainAction, catchAction);
  };
}

/*
    SUBMIT
 */
export const submitActions = actionCreator.async<{}, {}, ErrorWrapper>('ROOM/EDIT/SUBMIT');

export function submit(onSuccess: Function) {
  return async (dispatch: Dispatch<any>, getState: Function) => {

    async function mainAction() {
      dispatch(submitActions.started({}));
      const state = getState();
      const currentState: RoomReduxState = state[REDUCER_NAME__ROOM];
      let formValues = state.form[roomFormName].values || {};
      if (!formValues) {
        throw new ErrorWrapper('Nothing was filled');
      }
      if (!currentState.id) {
        throw new ErrorWrapper('Id is missing');
      }
      await RoomApi.update(currentState.id, formValues);
      dispatch(submitActions.done({ params: {}, result: {} }));
      toastr.success('Success', 'Item was successfully updated');
      if (onSuccess) {
        onSuccess();
      }
    }

    async function catchAction(exception: ErrorWrapper) {
      dispatch(submitActions.failed({ params: {}, error: exception }));
      toastr.error('Error', 'Error has occurred');
      CommonUtilities.scrollToTop();
    }

    await CommonUtilities.tryCatchWrapper(mainAction, catchAction);
  };
}

import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';
import { toastr } from 'react-redux-toastr';
// import { initialize } from "redux-form";

import { ErrorWrapper } from '../../../../viewModels/base';
import CommonUtilities from "../../../../helpers/CommonUtilities";
import RoomApi, {RoomApiUpdatePayload} from "../../../apis/Room.api";
import {roomFormName, RoomUpdateState} from "../Room.edit-component";
// import { RoomReduxState, REDUCER_NAME__ROOM } from "../Room.reducer";
// import {RoomCreateState} from "../Room.create-component";

const actionCreator = actionCreatorFactory();

/*
    CANCEL
 */

export const cancel = actionCreator<{}>('ROOM/EDIT/CANCEL');

/*
    START
 */
export const startActions = actionCreator.async<{}, {id: string, item: any}, ErrorWrapper>('ROOM/EDIT/START');

export function start(id: string) {
  return async (dispatch: Dispatch<any>, getState: Function) => {

    // TODO: to functional programming
    async function mainAction() {
      dispatch(startActions.started({}));
      const item = await RoomApi.getSingle(id);
      if (!item) {
        throw new ErrorWrapper(`Item with Id ${id} not found`);
      }
      // dispatch(initialize(roomFormName, item));
      dispatch(startActions.done({ params: {}, result: {id, item} }));
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

export function submit(id: string, formValues: RoomUpdateState, onSuccess: Function) {
  return async (dispatch: Dispatch<any>) => {

    async function mainAction() {
      dispatch(submitActions.started({}));
      if (!formValues) {
        throw new ErrorWrapper('Nothing was filled');
      }
      await RoomApi.update(new RoomApiUpdatePayload(id, formValues.name));
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

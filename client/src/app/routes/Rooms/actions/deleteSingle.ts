import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';
import { toastr } from 'react-redux-toastr';

import { ErrorWrapper } from '../../../types';
import CommonUtilities from "../../../helpers/CommonUtilities";
import { RoomsReduxState, REDUCER_NAME__ROOMS } from "../reducer";
import RoomApi from "../../../apis/RoomApi";

const actionCreator = actionCreatorFactory();

/*
    CANCEL
 */

export const cancel = actionCreator<{}>('ROOMS/DELETE/CANCEL');

/*
    START
 */
export const startActions = actionCreator.async<{}, {id: string}, ErrorWrapper>('ROOMS/DELETE/START');

// todo: delete
export function start(id: string) {
  return async (dispatch: Dispatch<any>) => {

    async function mainAction() {
      dispatch(startActions.started({}));
      const item = await RoomApi.getSingle(id);
      if (!item) {
        throw new ErrorWrapper(`Item with Id ${id} not found`);
      }
      dispatch(startActions.done({ params: {}, result: {id} }));
    }

    async function catchAction(exception: ErrorWrapper) {
      dispatch(startActions.failed({ params: {}, error: exception }));
      toastr.error('Error', 'Error has occurred');
      CommonUtilities.scrollToTop();
    }

    await CommonUtilities.tryCatchWrapper(mainAction, catchAction);
  };
}

/*
    SUBMIT
 */
export const submitActions = actionCreator.async<{}, {}, ErrorWrapper>('ROOMS/DELETE/SUBMIT');

export function submit(id: string, onSuccess: Function) {
  return async (dispatch: Dispatch<any>, getState: Function) => {

    async function mainAction() {
      dispatch(submitActions.started({}));

      await RoomApi.remove(id);
      dispatch(submitActions.done({ params: {}, result: {} }));
      toastr.success('Success', 'Item was successfully deleted');
      if (onSuccess) {
        await onSuccess();
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

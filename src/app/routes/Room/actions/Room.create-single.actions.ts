import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';
import { toastr } from 'react-redux-toastr';

import { ErrorWrapper } from '../../../../viewModels/base';
import CommonUtilities from "../../../../helpers/CommonUtilities";
import { roomFormName } from "../Room.create-component";
import RoomsApi from "../../../apis/Room.api";

const actionCreator = actionCreatorFactory();

/*
    CANCEL
 */

export const cancel = actionCreator<{}>('ROOM/CREATE/CANCEL');

/*
    START
 */
export const startActions = actionCreator.async<{}, {}, ErrorWrapper>('ROOM/CREATE/START');

export function start() {
  return async (dispatch: Dispatch<any>, getState: Function) => {

    async function mainAction() {
      dispatch(startActions.started({}));
      dispatch(startActions.done({ params: {}, result: {} }));
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
export const submitActions = actionCreator.async<{}, {}, ErrorWrapper>('ROOM/CREATE/SUBMIT');

export function submit(onSuccess: Function) {
  return async (dispatch: Dispatch<any>, getState: Function) => {

    async function mainAction() {
      dispatch(submitActions.started({}));
      let formValues = getState().form[roomFormName].values;
      if (!formValues) {
        throw new ErrorWrapper('Nothing was filled');
      }
      await RoomsApi.add(formValues);
      dispatch(submitActions.done({ params: {}, result: {} }));
      toastr.success('Success', 'Item was successfully created');
      if (onSuccess) {
        onSuccess();
      }
    }

    async function catchAction(exception: ErrorWrapper) {
      dispatch(submitActions.failed({ params: {}, error: exception }));
      toastr.error('Error', 'Error has occurred');
      CommonUtilities.logDevMessage(exception);
      CommonUtilities.scrollToTop();
    }

    await CommonUtilities.tryCatchWrapper(mainAction, catchAction);
  };
}

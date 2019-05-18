import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';
import { toastr } from 'react-redux-toastr';

import { ErrorWrapper } from '../../../types';
import CommonUtilities from "../../../helpers/CommonUtilities";
import RoomsApi, {RoomApiAddPayload} from "../../../apis/RoomApi";
import { FormValues } from '../types';

const actionCreator = actionCreatorFactory();

/*
    CANCEL
 */

export const cancel = actionCreator<{}>('ROOM/CREATE/CANCEL');

/*
    START
 */
export const startActions = actionCreator.async<{}, {}, ErrorWrapper>('ROOM/CREATE/START');

/*
    SUBMIT
 */
export const submitActions = actionCreator.async<{}, {}, ErrorWrapper>('ROOM/CREATE/SUBMIT');

export default function submit(formValues: FormValues, onSuccess: Function) {
  return async (dispatch: Dispatch<any>) => {

    async function mainAction() {
      dispatch(submitActions.started({}));
      if (!formValues) {
        throw new ErrorWrapper('Nothing was filled');
      }
      await RoomsApi.add(new RoomApiAddPayload(formValues.name));
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

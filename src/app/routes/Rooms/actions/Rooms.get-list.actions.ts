import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';
import { toastr } from 'react-redux-toastr';

import CommonUtilities from '../../../../helpers/CommonUtilities';
import { ErrorWrapper } from '../../../../viewModels/base';
import RoomApi from "../../../apis/Room.api";

const actionCreator = actionCreatorFactory();
export const asyncActions = actionCreator.async<
  {},
  {tableData: any},
  ErrorWrapper
  >('ROOMS/FETCH');

export default function submit(): any {
  return async (dispatch: Dispatch<any>, getState: Function) => {

    async function mainAction() {
      dispatch(asyncActions.started({}));

      const tableData = await RoomApi.getList();
      dispatch(asyncActions.done({ params: {}, result: {tableData} }));
    }

    async function catchAction(exception: ErrorWrapper) {
      dispatch(asyncActions.failed({ params: {}, error: exception }));
      toastr.error('Error', 'Error has occurred');
      CommonUtilities.scrollToTop();
    }

    await CommonUtilities.tryCatchWrapper(mainAction, catchAction);
  };
}

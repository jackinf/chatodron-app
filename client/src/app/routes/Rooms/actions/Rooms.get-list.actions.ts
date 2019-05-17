import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';
import { toastr } from 'react-redux-toastr';

import CommonUtilities from '../../../../helpers/CommonUtilities';
import { ErrorWrapper } from '../../../../types/base';
import RoomApi from "../../../apis/Room.api";
import {RoomsTableData} from "./Rooms.types";

const actionCreator = actionCreatorFactory();
export const asyncActions = actionCreator.async<
  {},
  {tableData: RoomsTableData},
  ErrorWrapper
  >('ROOMS/FETCH');

export default function submit(settings: { page: number; limit: number; }): any {
  return async (dispatch: Dispatch<any>) => {

    async function mainAction() {
      dispatch(asyncActions.started({}));

      const tableData = await RoomApi.getList(settings);
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

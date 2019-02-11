import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';
import { toastr } from 'react-redux-toastr';

import CommonUtilities from '../../../../helpers/CommonUtilities';
import { ErrorWrapper, SpeysPagination, TableData } from '../../../../viewModels/base';
import RoomsResponseViewModel from "../viewModels/RoomsResponseViewModel";
import RoomsApi from "./Rooms.api";
import { REDUCER_NAME__ROOMS } from "../Rooms.reducer";
import TableFormattingUtilities from "../../../../helpers/TableFormattingUtilities";

const actionCreator = actionCreatorFactory();
export const asyncActions = actionCreator.async<
  {},
  {tableData: TableData<RoomsResponseViewModel>},
  ErrorWrapper
  >('COMPANIES/FETCH');

export default function submit(paginationParams: SpeysPagination | null): any {
  return async (dispatch: Dispatch<{}>, getState: Function) => {

    async function mainAction() {
      dispatch(asyncActions.started({}));

      paginationParams = paginationParams || SpeysPagination.getDefault();
      const paginatedList = await RoomsApi.getList({...paginationParams});
      const tableData = TableData.createTableDataFrom(
        paginatedList,
        paginationParams.page,
        paginationParams.sizePerPage
      );
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


//
// Sorting and pagination
//

export function onSortChange(sortName: string, sortOrder: SortOrder) {
  return TableFormattingUtilities.getOnSortChangeAction(submit, REDUCER_NAME__ROOMS, sortName, sortOrder);
}

export function onPageChange(page: number, sizePerPage: number) {
  return TableFormattingUtilities.getOnPageChangeAction(submit, REDUCER_NAME__ROOMS, page, sizePerPage);
}

export function onSizePerPageList(sizePerPage: number) {
  return TableFormattingUtilities.getOnSizePerPageList(submit, REDUCER_NAME__ROOMS, sizePerPage);
}

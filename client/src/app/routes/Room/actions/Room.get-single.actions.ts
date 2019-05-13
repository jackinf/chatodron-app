import {Dispatch} from "redux";
import RoomApi from "../../../apis/Room.api";
import {ErrorWrapper} from "../../../../viewModels/base";
import {toastr} from "react-redux-toastr";
import CommonUtilities from "../../../../helpers/CommonUtilities";
import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();
export const startActions = actionCreator.async<{}, {id: string, item: any}, ErrorWrapper>('ROOM/GET');

export function start(id: string, onSuccess: Function) {
  return async (dispatch: Dispatch<any>) => {

    // TODO: to functional programming
    async function mainAction() {
      dispatch(startActions.started({}));
      const item = await RoomApi.getSingle(id);
      if (!item) {
        throw new ErrorWrapper(`Item with Id ${id} not found`);
      }
      // dispatch(initialize(roomFormName, item));
      dispatch(startActions.done({ params: {}, result: {id, item} }));
      onSuccess && onSuccess(item.name);
    }

    async function catchAction(exception: ErrorWrapper) {
      dispatch(startActions.failed({ params: {}, error: exception }));
      toastr.error('Error', 'Error has occurred'); // TODO: two next lines into 1 helper
      CommonUtilities.scrollToTop();
    }

    await CommonUtilities.tryCatchWrapper(mainAction, catchAction);
  };
}

import {Dispatch} from "redux";
import RoomApi from "../../../apis/RoomApi";
import {ErrorWrapper} from "../../../types";
import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();
export const startActions = actionCreator.async<
  {},
  {messages: any[]}, // TODO: define type
  ErrorWrapper
>('ROOM/GET-LAST-N-MESSAGES');

export function getLastNMessages(room: string, n: number) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(startActions.started({}));
    const messages = await RoomApi.getLastNMessages(room, n);
    dispatch(startActions.done({ params: {}, result: {messages} }));
  };
}

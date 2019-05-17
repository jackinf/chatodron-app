import {RoomType} from "../../types/Room.type";

export interface TableData<TDoc> {
  docs: Array<TDoc>
  limit: number;
  page: number;
  pages: number;
  total: number;
}

export interface RoomsTableData extends TableData<RoomType> {}

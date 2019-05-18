export interface RoomType {
  _id: string;
  name: string;
}

export interface TableData<TDoc> {
  docs: Array<TDoc>
  limit: number;
  page: number;
  pages: number;
  total: number;
}

export interface RoomsTableData extends TableData<RoomType> {}

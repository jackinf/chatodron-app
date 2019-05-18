import { WithStyles } from '@material-ui/core';
import styles from './styles';
import { RoomsTableData } from './types';
import { RouteComponentProps } from 'react-router';

interface RoomsProps extends WithStyles<typeof styles> {
  tableData: RoomsTableData,
  loading: boolean,

  getList: Function,
  remove: Function
}

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

export type Props = RoomsProps & RouteComponentProps<{}>;
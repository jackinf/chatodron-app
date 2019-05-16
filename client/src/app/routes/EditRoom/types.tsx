import { RouteComponentProps } from 'react-router';
import { WithStyles } from '@material-ui/core';
import styles from './styles';

export interface FormValues {
  name: string;
}
interface RoomUpdateProps { start: Function, submit: Function, loading: boolean, item?: any }
export type Props = RoomUpdateProps & RouteComponentProps<{ id: string }> & WithStyles<typeof styles>;
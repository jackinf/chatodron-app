import styles from './styles';
import { WithStyles } from '@material-ui/core';

export interface Config {
  backendHost: string;
}

export interface RootDispatchProps {}
export interface RootStateProps {
  loading: boolean;
  backendHost: string;
  error?: ErrorWrapper;
}
export type RootProps = RootDispatchProps & RootStateProps & WithStyles<typeof styles>;

export interface ServiceResult<T> {
  payload: T;
  isSuccessful: boolean;
}

export class ErrorWrapper {
  title: string;
  description: string;

  constructor(title: string, description?: string) {
    this.title = title;
    this.description = description || '';
  }
}
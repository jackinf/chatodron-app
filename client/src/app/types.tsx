import { ErrorWrapper } from '../types/base';

export interface Config {
  backendHost: string;
}

export interface RootDispatchProps {}
export interface RootStateProps {
  loading: boolean;
  error?: ErrorWrapper;
  isLoggedIn: boolean;
}
export type RootProps = RootDispatchProps & RootStateProps;
import { WithStyles } from '@material-ui/core';
import style from './style';
import { RouteComponentProps } from 'react-router';

export interface FormValues {
  name: string;
}

interface RenderProps {
  createSingle: (formValues: FormValues, onSuccess: () => void) => void;
}

export type CreateRoomProps = RenderProps & WithStyles<typeof style> & RouteComponentProps<any>;

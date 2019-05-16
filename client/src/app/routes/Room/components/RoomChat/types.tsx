import { WithStyles } from '@material-ui/core';
import styles from './components/MessagesBox/styles';

export interface MessageItem {
  author: string;
  message: string;
}

export interface SingleMessageProps {
  message: string;
  mineMessage: boolean;
  author: string;
}

export interface MessageBoxProps extends WithStyles<typeof styles> {
  message: string;
  messages: Array<{ author: string; message: string}>;
  onMessageChange: (ev: any) => void;
  onSendMessage: () => void;
}
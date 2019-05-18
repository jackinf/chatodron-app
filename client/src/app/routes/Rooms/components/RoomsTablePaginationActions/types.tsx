import { TablePaginationActionsProps } from '@material-ui/core/TablePagination/TablePaginationActions';
import { WithStyles, WithTheme } from '@material-ui/core';
import styles from './styles';

export type Props = TablePaginationActionsProps & WithStyles<typeof styles> & WithTheme;
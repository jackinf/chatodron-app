import * as React from 'react';
import {StyleRules, Theme, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {TablePaginationActionsProps} from "@material-ui/core/TablePagination/TablePaginationActions";

import {RoomType} from "../../types/Room.type";
import TableHead from "@material-ui/core/TableHead";

const actionsStyles = (theme: Theme): StyleRules => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

interface TablePaginationActionsAdditionalProps { classes: any; theme: any; }
class TablePaginationActions extends React.Component<
  TablePaginationActionsProps & TablePaginationActionsAdditionalProps> {
  handleFirstPageButtonClick = (event: any) => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = (event: any) => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = (event: any) => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = (event: any) => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const styles = (theme: Theme): StyleRules => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

interface RoomsTableProps {
  classes: any;
  docs: Array<RoomType>;
  limit: number;
  page: number;
  getList: Function;
  total: number;
}
class RoomsTable extends React.Component<RoomsTableProps> {
  static defaultProps = {
    docs: [],
    limit: 10, // todo: extract from here
    page: 0, // todo: extract from here
    total: 0 // todo: extract from here
  };

  handleChangePage = async (event: any, page: number) => {
    console.info('handleChangePage', page);
    await this.props.getList({ page: page+1, limit: this.props.limit });
  };

  handleChangeRowsPerPage = async (event: any) => {
    await this.props.getList({ page: this.props.page, limit: event.target.value });
  };

  render() {
    const { classes, docs, limit, page, total } = this.props;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  Name of the room
                </TableCell>
                <TableCell component="th" scope="row">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {docs.map(row => (
                <TableRow key={row._id}>
                  <TableCell component="td" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="td" scope="row">

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={total}
                  rowsPerPage={limit}
                  page={page-1}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(RoomsTable);

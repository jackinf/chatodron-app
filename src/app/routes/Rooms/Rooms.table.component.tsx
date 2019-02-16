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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ViewIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TableHead from "@material-ui/core/TableHead";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {RouteComponentProps, withRouter} from "react-router-dom";
import Button from '@material-ui/core/Button';

import {RoomType} from "../../types/Room.type";
const ITEM_HEIGHT = 48; // todo: to constants

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
  total: number;

  getList: Function;
  confirmDelete: Function;
}
interface RoomsTableState {
  actionMenuEl?: HTMLElement;
  deletePendingItemId?: string;
}
class RoomsTable extends React.Component<RoomsTableProps & RouteComponentProps<any>, RoomsTableState> {
  static defaultProps = {
    docs: [],
    limit: 10, // todo: extract from here
    page: 0, // todo: extract from here
    total: 0 // todo: extract from here
  };

  handleChangePage = async (event: any, page: number) => {
    await this.props.getList({ page: page+1, limit: this.props.limit });
  };

  handleChangeRowsPerPage = async (event: any) => {
    await this.props.getList({ page: this.props.page, limit: event.target.value });
  };

  refreshTable = async () => {
    await this.props.getList({ page: this.props.page, limit: this.props.limit });
  };

  handleOpenMenu = (event: any) => this.setState({ actionMenuEl: event.currentTarget });
  handleCloseMenu = () => this.setState({ actionMenuEl: undefined });
  viewItem = (id: string) => this.props.history.push(`/rooms/${id}`); // todo: to constants; todo: dispatch route change
  editItem = (id: string) => this.props.history.push(`/rooms/${id}/edit`); // todo: to constants; todo: dispatch route change
  startDelete = (deletePendingItemId: string) => {
    this.handleCloseMenu();
    this.setState({ deletePendingItemId })
  };
  cancelDelete = () => this.setState({ deletePendingItemId: undefined });
  confirmDelete = () => this.props.confirmDelete(this.state.deletePendingItemId, async () => {
    this.cancelDelete();
    await this.refreshTable();
  });
  isDeletePending = () => !!this.state && !!this.state.deletePendingItemId;

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
              {docs.map((row: RoomType) => {
                const actionMenuEl = this.state && this.state.actionMenuEl;
                const menuButtonId = `menu-button-${row._id}`;
                const open = Boolean(actionMenuEl && actionMenuEl.id === menuButtonId);

                return (
                  <TableRow key={row._id}>
                    <TableCell component="td" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell component="td" scope="row">
                      <IconButton
                        id={menuButtonId}
                        aria-label="More"
                        aria-owns={open ? 'long-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleOpenMenu}
                      >
                        <MoreVertIcon/>
                      </IconButton>
                      <Menu
                        id={menuButtonId}
                        anchorEl={actionMenuEl}
                        open={open}
                        onClose={this.handleCloseMenu}
                        PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200,
                          },
                        }}
                      >
                        <MenuItem onClick={() => this.viewItem(row._id)}>
                          <ViewIcon className={classes.icon}/> &nbsp;
                          View
                        </MenuItem>
                        <MenuItem onClick={() => this.editItem(row._id)}>
                          <EditIcon className={classes.icon}/> &nbsp;
                          Edit
                        </MenuItem>
                        <MenuItem onClick={() => this.startDelete(row._id)}>
                          <DeleteIcon className={classes.icon}/> &nbsp;
                          Delete
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                );
              })}
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

        <Dialog
          open={this.isDeletePending()}
          onClose={this.cancelDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure that you'd liked to delete the item?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancelDelete} color="primary">Cancel</Button>
            <Button onClick={this.confirmDelete} color="primary" autoFocus>Ok</Button>
          </DialogActions>
        </Dialog>

      </Paper>
    );
  }
}

export default withStyles(styles)(withRouter(RoomsTable));

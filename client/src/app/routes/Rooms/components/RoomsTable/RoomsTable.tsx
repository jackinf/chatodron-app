import React, { useState } from 'react';
import { StyleRules, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InputIcon from '@material-ui/icons/Input';
import ViewIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TableHead from '@material-ui/core/TableHead';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { RoomType } from '../../types';
import { defaultMargin } from '../../../../helpers/layoutHelper';
import { ITEM_HEIGHT } from '../../constants';
import RoomsTablePaginationActions from '../RoomsTablePaginationActions';
import { DEFAULT_LIMIT, DEFAULT_TOTAL } from './constants';
import { roomRoutes } from '../../../../constants';

const styles = (theme: Theme): StyleRules => ({
  root: {
    ...defaultMargin(theme),
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

interface RoomsTableProps extends WithStyles<typeof styles> {
  docs: Array<RoomType>;
  limit: number;
  page: number;
  total: number;

  getList: Function;
  confirmDelete: Function;
}

function RoomsTable(props: RoomsTableProps & RouteComponentProps<{}>) {
  const [actionMenuEl, setActionMenuEl] = useState<HTMLElement | undefined>(undefined);
  const [deletePendingItemId, setDeletePendingItemId] = useState<string | undefined>(undefined);

  const { getList, confirmDelete, classes, docs, limit, page, total, history } = props;

  const handleChangePage = async (event: any, page: number) => await getList({page: page + 1, limit});
  const handleChangeRowsPerPage = async (event: any) => await getList({page, limit: event.target.value});
  const handleRefreshTable = async () => await getList({page, limit});
  const handleOpenMenu = (event: any) => setActionMenuEl(event.currentTarget);
  const handleCloseMenu = () => setActionMenuEl(undefined);
  const handleEnterChat = (id: string) => history.push(roomRoutes.chat(id));
  const handleViewItem = (id: string) => history.push((roomRoutes.view(id)));
  const handleEditItem = (id: string) => history.push(roomRoutes.edit(id));
  const handleStartDelete = (deletePendingItemId: string) => {
    handleCloseMenu();
    setDeletePendingItemId(deletePendingItemId);
  };
  const handleCancelDelete = () => setDeletePendingItemId(undefined);
  const handleConfirmDelete = () => confirmDelete(deletePendingItemId, async () => {
    handleCancelDelete();
    await handleRefreshTable();
  });
  const isDeletePending = () => !!deletePendingItemId;

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
            {docs && docs.map((row: RoomType) => {
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
                      onClick={handleOpenMenu}
                    >
                      <MoreVertIcon/>
                    </IconButton>
                    <Menu
                      id={menuButtonId}
                      anchorEl={actionMenuEl}
                      open={open}
                      onClose={handleCloseMenu}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: 200,
                        },
                      }}
                    >
                      <MenuItem onClick={() => handleEnterChat(row._id)}>
                        <InputIcon className={classes.icon}/> &nbsp;
                        Enter
                      </MenuItem>
                      <MenuItem onClick={() => handleViewItem(row._id)}>
                        <ViewIcon className={classes.icon}/> &nbsp;
                        View Details
                      </MenuItem>
                      <MenuItem onClick={() => handleEditItem(row._id)}>
                        <EditIcon className={classes.icon}/> &nbsp;
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => handleStartDelete(row._id)}>
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
                count={total || DEFAULT_TOTAL}
                rowsPerPage={limit || DEFAULT_LIMIT}
                page={page - 1}
                SelectProps={{
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={RoomsTablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <Dialog
        open={isDeletePending()}
        onClose={handleCancelDelete}
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
          <Button onClick={handleCancelDelete} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>Ok</Button>
        </DialogActions>
      </Dialog>

    </Paper>
  );
}

export default withStyles(styles)(withRouter(RoomsTable));

import React, {Component} from 'react';
import { connect } from 'react-redux';
import {RouteComponentProps, withRouter} from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import {Theme} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

import getList from "./actions/Rooms.get-list.actions";
import { submit as remove } from "./actions/Rooms.delete-single.actions";
import { REDUCER_NAME__ROOMS } from "./Rooms.reducer";
import RoomsTable from "./components/RoomsTable";
import {RoomsTableData} from "./actions/Rooms.types";
import Centered from '../../../components/Centered';
import { roomRoutes } from '../constants';

function mapStateToProps(state: any) {
  const { tableData, loading } = state[REDUCER_NAME__ROOMS];
  return {
    loading,
    tableData
  };
}

const mapDispatchToProps = { getList, remove };

const styles = (theme: Theme): StyleRules => ({
  wrapper: {
  },

  main: {
    flexGrow: 1,
  },

  addButton: {
    position: "fixed",
    bottom: theme.spacing.unit * 15,
    right: theme.spacing.unit * 2,
  },
});

interface RoomsProps extends WithStyles<typeof styles> {
  tableData: RoomsTableData,
  loading: boolean,

  getList: Function,
  remove: Function
}
class Rooms extends Component<RoomsProps & RouteComponentProps<{}>> {
  async componentDidMount() {
    await this.props.getList();
  }

  goToAddItemPage = () => this.props.history.push(roomRoutes.newRoom());
  remove = () => this.props.remove();

  render() {
    const { tableData, getList, classes } = this.props;

    return (
      <>
        <Centered>
          <RoomsTable
            getList={getList}
            confirmDelete={this.props.remove}
            page={tableData.page}
            limit={tableData.limit}
            docs={tableData.docs}
            total={tableData.total}
          />
        </Centered>
        <Fab className={classes.addButton} color="secondary">
          <AddIcon onClick={this.goToAddItemPage} />
        </Fab>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Rooms)));

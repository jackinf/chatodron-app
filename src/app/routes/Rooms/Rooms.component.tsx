import React, {Component} from 'react';
import { connect } from 'react-redux';
import {RouteComponentProps, withRouter} from "react-router-dom";
import Fab from '@material-ui/core/Fab';

import getList from "./actions/Rooms.get-list.actions";
import { submit as remove } from "./actions/Rooms.delete-single.actions";
import { REDUCER_NAME__ROOMS } from "./Rooms.reducer";
import RoomsTable from "./Rooms.table.component";
import {RoomsTableData} from "./actions/Rooms.types";
import withStyles, {StyleRules} from "@material-ui/core/styles/withStyles";
import {Theme} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

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
    // display: "flex",
    // minHeight: "100vh",
    // flexDirection: "column"
  },

  main: {
    // flex: 1
  },

  addButton: {
    position: "fixed",
    bottom: theme.spacing.unit * 15,
    right: theme.spacing.unit * 2,

    // marginLeft: 'auto',
    // marginRight: theme.spacing.unit * 2,
    // marginBottom: theme.spacing.unit * 2,
    // marginTop: theme.spacing.unit * 2
  },
});

interface RoomsProps {
  tableData: RoomsTableData,
  loading: boolean,
  classes: any,

  getList: Function,
  remove: Function
}
class Rooms extends Component<RoomsProps & RouteComponentProps<any>> {
  async componentDidMount() {
    await this.getList();
  }

  getList = async () => await this.props.getList();
  goToAddItemPage = () => this.props.history.push("/rooms/new"); // todo: to constants; todo; dispatch action
  remove = () => this.props.remove();

  render() {
    const { tableData, getList, loading, classes } = this.props;

    return (
      <div className={classes && classes.wrapper}>
        <span className={classes && classes.main}>
          <RoomsTable
            getList={getList}
            confirmDelete={this.props.remove}
            page={tableData.page}
            limit={tableData.limit}
            docs={tableData.docs}
            total={tableData.total}
          />
        </span>

        <Fab className={classes.addButton} color="secondary">
          <AddIcon onClick={this.goToAddItemPage} />
        </Fab>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Rooms)));

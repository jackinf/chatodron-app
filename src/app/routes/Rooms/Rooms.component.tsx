import React, {Component} from 'react';
import { connect } from 'react-redux';
// import { Link } from "react-router-dom";

import getList from "./actions/Rooms.get-list.actions";
import { submit as remove } from "./actions/Rooms.delete-single.actions";
import { REDUCER_NAME__ROOMS } from "./Rooms.reducer";
import RoomsTable from "./Rooms.table.component";
import {RoomsTableData} from "./actions/Rooms.types";

function mapStateToProps(state: any) {
  const { tableData, loading } = state[REDUCER_NAME__ROOMS];
  return {
    loading,
    tableData
  };
}

const mapDispatchToProps = { getList, remove };

interface RoomsProps { getList: Function, remove: Function, tableData: RoomsTableData, loading: boolean }
class Rooms extends Component<RoomsProps> {
  async componentDidMount() {
    await this.props.getList();
  }

  render() {
    const { tableData, getList, loading, remove } = this.props;

    return (
      <div>
        Rooms table goes here
        <RoomsTable
          getList={getList}
          confirmDelete={remove}
          page={tableData.page}
          limit={tableData.limit}
          docs={tableData.docs}
          total={tableData.total}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rooms);

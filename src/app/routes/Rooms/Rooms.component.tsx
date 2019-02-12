import React, {Component} from 'react';
import {connect} from 'react-redux';

import getList from "./actions/Rooms.get-list.actions";
import {REDUCER_NAME__ROOMS} from "./Rooms.reducer";

function mapStateToProps(state: any) {
  const { tableData, loading } = state[REDUCER_NAME__ROOMS];
  return {
    loading,
    tableData
  };
}

const mapDispatchToProps = { getList };

interface RoomsProps { getList: Function, tableData: any, loading: boolean }
class Rooms extends Component<RoomsProps> {
  async componentDidMount() {
    await this.props.getList();
  }

  render() {
    const { tableData, loading } = this.props;

    return (
      <div>
        Rooms table goes here
        <ul>
          {!loading && tableData.docs && tableData.docs.map((doc: any, i: number) => <li key={i}>{doc.name}</li>)}
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rooms);
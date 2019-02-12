import React, {Component} from 'react';
import { connect } from 'react-redux';

import getList from "./actions/Rooms.get-list.actions";
import { submit as remove } from "./actions/Rooms.delete-single.actions";
import { REDUCER_NAME__ROOMS } from "./Rooms.reducer";
import { Link } from "react-router-dom";

function mapStateToProps(state: any) {
  const { tableData, loading } = state[REDUCER_NAME__ROOMS];
  return {
    loading,
    tableData
  };
}

const mapDispatchToProps = { getList, remove };

interface RoomsProps { getList: Function, remove: Function, tableData: any, loading: boolean }
class Rooms extends Component<RoomsProps> {
  async componentDidMount() {
    await this.props.getList();
  }

  render() {
    const { tableData, loading, remove } = this.props;

    return (
      <div>
        Rooms table goes here
        <ul>
          {!loading && tableData.docs && tableData.docs.map((doc: any, i: number) => (
            <li key={i}>
              <Link to={`rooms/${doc._id}`}>{doc.name}</Link> &nbsp;
              <a href="" onClick={() => remove(doc._id, async () => { await this.props.getList(); })}>X</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rooms);

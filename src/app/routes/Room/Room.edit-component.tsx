import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from "react-router";

import {
  start,
  submit
} from './actions/Room.udpate-single.actions';
import {REDUCER_NAME__ROOM} from "./Room.reducer";
import {withRouter} from "react-router";

export const roomFormName = "room-edit-form";

function mapStateToProps(state: any) {
  const { loading, item } = state[REDUCER_NAME__ROOM];
  return { loading, item };
}
const mapDispatchToProps = { start, submit };

interface RoomUpdateProps { start: Function, submit: Function, loading: boolean, item?: any }
export interface RoomUpdateState { name: string }

class RoomEdit extends Component<RoomUpdateProps & RouteComponentProps<{ id: string }>, RoomUpdateState> {
  async componentDidMount() {
    await this.props.start(this.props.match.params.id);
  }

  render() {
    const { submit, loading, item } = this.props;
    const id = this.props.match.params.id;

    if (loading || !item) {
      return <div>Loading</div>
    }

    return (
      <div>
        Room Edit form goes here

        <input defaultValue={item.name} type="text" onChange={e => this.setState({ name: e.target.value })}/>
        <button onClick={() => submit(id, this.state, () => { console.info("updated"); })}>Update</button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RoomEdit));

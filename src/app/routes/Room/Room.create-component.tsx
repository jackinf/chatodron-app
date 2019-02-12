import React, {Component} from 'react';
import {connect} from 'react-redux';

import createSingle from './actions/Room.create-single.actions';

export const roomFormName = "room-create-form";

function mapStateToProps(state: any) {
  return {};
}
const mapDispatchToProps = { createSingle };

interface RoomCreateProps { createSingle: Function }
export interface RoomCreateState { name: string }
class RoomCreate extends Component<RoomCreateProps, RoomCreateState> {
  render() {
    const { createSingle } = this.props;

    return (
      <div>
        Room Create form goes here

        <input type="text" onChange={e => this.setState({ name: e.target.value })}/>
        <button onClick={() => createSingle(this.state, () => { console.info("added"); })}>Create</button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomCreate);

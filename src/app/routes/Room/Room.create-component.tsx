import React, {Component} from 'react';
import {connect} from 'react-redux';

export const roomFormName = "room-create-form";

function mapStateToProps(state: any) {
  return {};
}

class RoomCreate extends Component {
  render() {
    return (
      <div>
        Room Create form goes here
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(RoomCreate);

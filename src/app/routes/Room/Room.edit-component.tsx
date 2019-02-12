import React, {Component} from 'react';
import {connect} from 'react-redux';

export const roomFormName = "room-edit-form";

function mapStateToProps(state: any) {
  return {};
}

class RoomEdit extends Component {
  render() {
    return (
      <div>
        Room Edit form goes here
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(RoomEdit);

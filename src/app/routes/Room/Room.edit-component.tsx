import React, {Component} from 'react';
import {connect} from 'react-redux';

function mapStateToProps(state) {
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

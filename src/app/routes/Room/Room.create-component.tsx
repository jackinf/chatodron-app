import React, {Component} from 'react';
import {connect} from 'react-redux';

function mapStateToProps(state) {
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

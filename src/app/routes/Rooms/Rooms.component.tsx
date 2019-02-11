import React, {Component} from 'react';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {};
}

class Rooms extends Component {
  render() {
    return (
      <div>
        Rooms table goes here
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(Rooms);

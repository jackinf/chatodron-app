import * as React from 'react';
import {Link} from "react-router-dom";

class TemtHeader extends React.Component<any, any> {
  render() {
    return (
      <div>
        HEADER
        <ul>
          <li><Link to="">Home</Link></li>
          <li><Link to="rooms">Rooms</Link></li>
        </ul>
      </div>
    );
  }
}

export default TemtHeader;

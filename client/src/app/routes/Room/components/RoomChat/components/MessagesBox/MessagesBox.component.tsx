import React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import styles from './styles';
import './MessageBox.component.css';

function MessagesBox(props: WithStyles<typeof styles>) {
  return (
    <div className="wrapper">
      <nav className="nav" id="nav">
        <div className="default-nav">
          <div className="main-nav">
            <div className="toggle" />
            <div className="main-nav-item">
              <a className="main-nav-item-link" href="#">Blake</a>
            </div>
            <div className="options" />
          </div>
        </div>
      </nav>
      <div className="inner" id="inner">
        <div className="content" id="content">
          <div className="message-wrapper them">
            <div className="circle-wrapper animated bounceIn"></div>
            <div className="text-wrapper animated fadeIn">Hello there!</div>
          </div>
          <div className="message-wrapper them">
            <div className="circle-wrapper animated bounceIn"></div>
            <div className="text-wrapper animated fadeIn">Hello there!</div>
          </div>
          <div className="message-wrapper them">
            <div className="circle-wrapper animated bounceIn"></div>
            <div className="text-wrapper animated fadeIn">Hello there!</div>
          </div>

          <div className="message-wrapper me">
            <div className="circle-wrapper animated bounceIn"></div>
            <div className="text-wrapper animated fadeIn">Hello there!</div>
          </div>

          <div className="message-wrapper me">
            <div className="circle-wrapper animated bounceIn"></div>
            <div className="text-wrapper animated fadeIn">Hello there!</div>
          </div>

          <div className="message-wrapper me">
            <div className="circle-wrapper animated bounceIn"></div>
            <div className="text-wrapper animated fadeIn">Hello there!</div>
          </div>

          <div className="message-wrapper me">
            <div className="circle-wrapper animated bounceIn"></div>
            <div className="text-wrapper animated fadeIn">Hello there!</div>
          </div>

          <div className="message-wrapper me">
            <div className="circle-wrapper animated bounceIn"></div>
            <div className="text-wrapper animated fadeIn">Hello there!</div>
          </div>
        </div>
      </div>
      <div className="bottom" id="bottom">
        <textarea className="input" id="input" />
        <div className="send" id="send" />
      </div>
    </div>
  )
}

export default withStyles(styles)(MessagesBox);
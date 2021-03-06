import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from './styles';
import './ChatWindow.css';
import { MessageBoxProps, MessageItem } from '../../types';
import SingleMessage from '../SingleMessage/SingleMessage.component';
import scrollToBottomOfDiv from '../../helpers/scrollToBottomOfDiv';
import { messageContainerDiv } from '../../constants';

function MessagesBox({
  message,
  messages,
  onMessageChange,
  onSendMessage,
  socketId,
}: MessageBoxProps) {
  const handleSendMessage = () => {
    onSendMessage();
    scrollToBottomOfDiv(messageContainerDiv);
  };

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
      <div className="inner" id={messageContainerDiv}>
        <div className="content" id="content">
          {messages && messages.map((messageItem: MessageItem, index: number) => (
            <SingleMessage
              key={index}
              message={messageItem.message}
              mineMessage={messageItem.author === socketId}
              author={messageItem.author}
            />
          ))}
        </div>
      </div>
      <div className="bottom" id="bottom">
        <textarea
          className="input"
          id="input"
          value={message}
          onChange={onMessageChange}
          onKeyDown={e => e.keyCode === 13 && !e.shiftKey && handleSendMessage()}
        />
        <div className="send" id="send" onClick={handleSendMessage} />
      </div>
    </div>
  )
}

export default withStyles(styles)(MessagesBox);
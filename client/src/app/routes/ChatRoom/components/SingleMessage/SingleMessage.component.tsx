import { SingleMessageProps } from '../../types';
import React from 'react';

export default function SingleMessage({ message, mineMessage, author }: SingleMessageProps) {
  return (
    <div className={`message-wrapper ${mineMessage ? 'me' : 'them'}`}>
      <div className="circle-wrapper animated bounceIn" />
      <div className="text-wrapper animated fadeIn">{message}</div>
    </div>
  );
}

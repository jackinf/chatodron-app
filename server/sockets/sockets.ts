import socket from 'socket.io';

import {socketEvents} from './constants';
import messageService from '../services/message.service';

const start = (server: any) => {
  const io = socket(server);
  io.on('connection', (socket: any) => {
    socket.on(socketEvents.ENTER_ROOM, (data: any) => {
      socket.join(data.room);
      emitRoomParticipants(io, data.room);
    });

    socket.on(socketEvents.LEAVE_ROOM, (data: any) => {
      socket.leave(data.room, () => emitRoomParticipants(io, data.room));
    });

    socket.on(socketEvents.SEND_MESSAGE, function(data: any) {
      if (data.room) {
        const payload = { ...data, author: socket.id };
        messageService.add(payload);
        io.to(data.room).emit(socketEvents.RECEIVE_MESSAGE, payload);
      }
    });

    socket.on(socketEvents.CHECK_ROOM_PARTICIPANTS, function(data: any) {
      if (data.room) {
        emitRoomParticipants(io, data.room);
      }
    });

    socket.on('disconnect', function() {});
  });
};

function emitRoomParticipants(io: any, room: any) {
  const { sockets } = io.sockets.adapter.rooms[room];
  io.to(room).emit(socketEvents.ROOM_PARTICIPANTS, { activeUsers: sockets });
}

export default {
  start,
}

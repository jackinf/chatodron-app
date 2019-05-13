const {socketEvents} = require('./constants');

const socket = require('socket.io');
const messageService = require('../services/message.service');

exports.start = (server) => {
  const io = socket(server);
  io.on('connection', (socket) => {
    socket.on(socketEvents.ENTER_ROOM, data => {
      socket.join(data.room);
      emitRoomParticipants(io, data.room);
    });

    socket.on(socketEvents.LEAVE_ROOM, data => {
      socket.leave(data.room, () => emitRoomParticipants(io, data.room));
    });

    socket.on(socketEvents.SEND_MESSAGE, function(data) {
      if (data.room) {
        const payload = { ...data, author: socket.id };
        messageService.add(payload);
        io.to(data.room).emit(socketEvents.RECEIVE_MESSAGE, payload);
      }
    });

    socket.on(socketEvents.CHECK_ROOM_PARTICIPANTS, function(data) {
      if (data.room) {
        emitRoomParticipants(io, data.room);
      }
    });

    socket.on('disconnect', function() {});
  });
};

function emitRoomParticipants(io, room) {
  const { sockets } = io.sockets.adapter.rooms[room];
  io.to(room).emit(socketEvents.ROOM_PARTICIPANTS, { activeUsers: sockets });
}

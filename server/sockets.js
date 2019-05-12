const socket = require('socket.io');
const messageService = require('./services/message.service');

exports.start = (server) => {
  const io = socket(server);
  io.on('connection', (socket) => {
    socket.on('ENTER_ROOM', data => {
      socket.join(data.room);
    });

    socket.on('LEAVE_ROOM', data => {
      socket.leave(data.room, undefined);
    });

    socket.on('SEND_MESSAGE', function(data) {
      if (data.room) {
        const payload = { ...data, author: socket.id };
        messageService.add(payload);
        io.to(data.room).emit('RECEIVE_MESSAGE', payload);
      }
    });

    socket.on('disconnect', function() {});
  });
};

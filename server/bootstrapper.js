const socket = require('socket.io');

exports.init = function init() {
  initDatabaseConnection();
};
exports.initSockets = initSockets;

function initDatabaseConnection() {
  const mongoose = require('mongoose');
  mongoose.connect(process.env.CHATODRON_MONGODB_URI, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

function initSockets(server) {
  const io = socket(server);
  io.on('connection', (socket) => {
    socket.on('ENTER_ROOM', data => {
      socket.join(data.room);
      // console.log(`${socket.id} joined room ${data.room}`)
    });

    socket.on('LEAVE_ROOM', data => {
      socket.leave(data.room, undefined);
      // console.log(`${socket.id} left room ${data.room}`)
    });

    socket.on('SEND_MESSAGE', function(data) {
      if (data.room) {
        io.to(data.room).emit('RECEIVE_MESSAGE', { ...data, author: socket.id });
      }
    });

    socket.on('disconnect', function () {
      console.log('disconnected');
    });
  });
}

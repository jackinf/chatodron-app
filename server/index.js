const express = require('express');
const bodyParser = require('body-parser');

const status = require('./routes/status.route');
const rooms = require('./routes/room.route');
const messages = require('./routes/message.route');
const app = express();

const database = require('./database');
database.start();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/status', status);
app.use('/rooms', rooms);
app.use('/messages', messages);

let port = 4000;
const server = app.listen(port, () => console.log(`Server is up and running on port number ${port}`));

/*
  Sockets need to be initialized as a last step when database and server are up.
 */
const sockets = require('./sockets');
sockets.start(server);

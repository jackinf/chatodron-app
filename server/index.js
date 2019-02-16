const express = require('express');
const bodyParser = require('body-parser');
const bootstrapper = require('./bootstrapper');

const rooms = require('./routes/room.route'); // Imports routes for the products
const app = express();

bootstrapper.init();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/rooms', rooms);

let port = 4000;

const server = app.listen(port, () => {
  console.log(`Server is up and running on port number ${port}`);
});

bootstrapper.initSockets(server);

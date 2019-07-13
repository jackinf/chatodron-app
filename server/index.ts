import express from 'express';
import bodyParser from 'body-parser';

import status from './routes/status.route';
import rooms from './routes/room.route';
import messages from './routes/message.route';
import database from './database';
import sockets from './sockets';
import { verifyUserMiddleware } from './auth';

const app = express();

database.start();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/status', verifyUserMiddleware, status); // TODO: middleware added here for testing purposes. Remove
app.use('/rooms', rooms);
app.use('/messages', messages);

let port = 4000;
const server = app.listen(port, () => console.log(`Server is up and running on port number ${port}`));

/*
  Sockets need to be initialized as a last step when database and server are up.
 */
sockets.start(server);

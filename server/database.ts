import mongoose from 'mongoose';

export function start() {
  const url = process.env.CHATODRON_MONGODB_URI;
  if (!url) {
    throw new Error('MongoDB connection string is undefined');
  }
  mongoose.connect(url, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

export default {
  start,
}

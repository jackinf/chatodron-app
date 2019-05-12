exports.start = () => {
  const mongoose = require('mongoose');
  mongoose.connect(process.env.CHATODRON_MONGODB_URI, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
};
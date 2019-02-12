exports.init = function init() {
  initDatabaseConnection();
};

function initDatabaseConnection() {
  const mongoose = require('mongoose');
  mongoose.connect(process.env.CHATODRON_MONGODB_URI, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

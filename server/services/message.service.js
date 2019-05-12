const Message = require('../models/Message.model');

exports.search = ({ page, limit }) => Message.paginate({}, { page, limit });
exports.add = ({ author, room, message }) => {
  if (!author || !room || !message) {
    throw new Error("Author, room and/or message is/are missing.");
  }
  return Message({ author, room, message, date: new Date() }).save();
};
exports.getLastN = ({ n, room }) => Message.find({ room }).sort('-date').limit(n);
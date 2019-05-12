const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

let MessageSchema = new Schema({
  author: {
    type: String,
    required: true,
    max: 100,
  },
  room: {
    type: String,
    required: true,
    max: 100,
  },
  message: {
    type: String,
    required: true,
    max: 1000,
  },
  date: {
    type: Date,
    required: true,
  }
});
MessageSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Message', MessageSchema);

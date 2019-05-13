import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

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

export default mongoose.model('Message', MessageSchema);

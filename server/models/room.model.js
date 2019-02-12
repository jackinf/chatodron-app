const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

let RoomSchema = new Schema({ name: { type: String, required: true, max: 100 } });
RoomSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Room', RoomSchema);

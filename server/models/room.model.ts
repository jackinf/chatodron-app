import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

let RoomSchema = new Schema({ name: { type: String, required: true, max: 100 } });
RoomSchema.plugin(mongoosePaginate);

export default mongoose.model('Room', RoomSchema);

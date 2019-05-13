import Message from '../models/message.model';

export const search = ({ page, limit }: any) => Message.paginate({}, { page, limit });
export const add = ({ author, room, message }: any) => {
  if (!author || !room || !message) {
    throw new Error("Author, room and/or message is/are missing.");
  }
  return new Message({ author, room, message, date: new Date() }).save();
};
export const getLastN = ({ n, room }: any) => Message.find({ room }).sort('-date').limit(n);

export default {
  search,
  add,
  getLastN,
}

import mongoose from 'mongoose';
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  description: String
});
export default mongoose.model('Book', bookSchema);

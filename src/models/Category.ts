import * as mongoose from 'mongoose';
import { model, Schema } from 'mongoose';

const categorySchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  name: { type: String, required: true },
  created_at: { type: Date, default: new Date(), required: true },
  updated_at: { type: Date, default: new Date(), required: true }
});

export default model('categories', categorySchema);
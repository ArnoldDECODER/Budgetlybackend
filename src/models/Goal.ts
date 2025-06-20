import * as mongoose from 'mongoose';
import { model, Schema } from 'mongoose';

const goalSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  title: { type: String, required: true },
  target_amount: { type: Number, required: true },
  current_amount: { type: Number, default: 0 },
  deadline: { type: Date },
  created_at: { type: Date, default: new Date(), required: true },
  updated_at: { type: Date, default: new Date(), required: true }
});

export default model('goals', goalSchema);
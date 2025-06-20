import * as mongoose from 'mongoose';
import { model, Schema } from 'mongoose';

const transactionSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true },
  notes: { type: String },
  created_at: { type: Date, default: new Date(), required: true },
  updated_at: { type: Date, default: new Date(), required: true }
});

export default model('transactions', transactionSchema);
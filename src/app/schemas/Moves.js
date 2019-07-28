import mongoose from 'mongoose';

const Movimentacoes = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  entered: {
    type: Boolean,
    default: true,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('moves', Movimentacoes);

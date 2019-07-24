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
    default: false,
  },
});

export default mongoose.model('movimentacao', Movimentacoes);

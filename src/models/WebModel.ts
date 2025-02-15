import mongoose from 'mongoose';

const Web3ValueSchema = new mongoose.Schema({
  txHash: {
    type: String,
    required: true,
    unique: true
  },
  fromAddress: {
    type: String,
    required: true
  },
  toAddress: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  blockNumber: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Web3Value || mongoose.model('Web3Value', Web3ValueSchema);
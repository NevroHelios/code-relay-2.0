
import mongoose from 'mongoose';

const TokenTransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  transactionType: {
    type: String,
    enum: ['earn', 'redeem'],
    required: true
  },
  source: {
    type: String,
    enum: ['cleanup', 'event', 'peer_review', 'reward_redemption']
  },
  relatedContribution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contribution'
  },
  relatedReward: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reward'
  }
}, { timestamps: true });

export default mongoose.models.TokenTransaction || mongoose.model('TokenTransaction', TokenTransactionSchema);
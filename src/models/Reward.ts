
import mongoose from 'mongoose';

const RewardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  pointCost: {
    type: Number,
    required: true
  },
  description: String,
  nftReward: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NFT'
  },
  physicalReward: String,
  stock: {
    type: Number,
    default: -1 // -1 for unlimited
  },
  expirationDate: Date
}, { timestamps: true });

export default mongoose.models.Reward || mongoose.model('Reward', RewardSchema);
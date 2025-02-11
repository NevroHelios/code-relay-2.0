
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  verifiedContributions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contribution'
  }],
  ownedNFTs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NFT'
  }],
  lastActivity: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

UserSchema.index({ walletAddress: 1 });
UserSchema.index({ totalPoints: -1 });

export default mongoose.models.User || mongoose.model('User', UserSchema);
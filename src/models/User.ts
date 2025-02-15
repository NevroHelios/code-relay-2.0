
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
    default : "user@gmail.com"
  },
  name: {
    type: String,
    required: true,
    default : "anonymous"
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  verifiedContributions:{
    type : [String]
  },
  // ownedNFTs: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'NFT'
  // }],
  lastActivity: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
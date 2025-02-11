import mongoose from 'mongoose';

const NFTSchema = new mongoose.Schema({
  tokenId: {
    type: Number,
    required: true,
    unique: true,
  },
  tokenURI: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  claimedBy: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.NFT || mongoose.model('NFT', NFTSchema);
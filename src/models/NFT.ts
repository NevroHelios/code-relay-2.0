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
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
}, { timestamps: true });

NFTSchema.index({ tokenId: 1 });

export default mongoose.models.NFT || mongoose.model('NFT', NFTSchema);
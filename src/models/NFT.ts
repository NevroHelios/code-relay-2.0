import mongoose from 'mongoose';

const NFTSchema = new mongoose.Schema({
  tokenId: {
    type: Number,
    required: true,
    unique: true
  },
  tokenURI: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.NFT || mongoose.model('NFT', NFTSchema);
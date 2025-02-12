
import mongoose from 'mongoose';

const BlacklistedPhotoSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
    unique: true
  },
  reason: String,
  detectedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.BlacklistedPhoto || mongoose.model('BlacklistedPhoto', BlacklistedPhotoSchema);

import mongoose from 'mongoose';

const ContributionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  qrCodeId: {
    type: String,
    required: true
  },
  photoHash: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  validationVotes: [{
    voter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    approved: Boolean
  }],
  aiValidationScore: Number
}, { timestamps: true });

// Geospatial index for location-based queries
ContributionSchema.index({ location: '2dsphere' });

export default mongoose.models.Contribution || mongoose.model('Contribution', ContributionSchema);
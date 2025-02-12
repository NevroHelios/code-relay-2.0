
import mongoose from 'mongoose';

const PeerReviewSchema = new mongoose.Schema({
  contribution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contribution',
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  decision: {
    type: String,
    enum: ['approve', 'reject'],
    required: true
  },
  comments: String
}, { timestamps: true });

// Ensure unique reviewer per contribution
PeerReviewSchema.index({ contribution: 1, reviewer: 1 }, { unique: true });

export default mongoose.models.PeerReview || mongoose.model('PeerReview', PeerReviewSchema);
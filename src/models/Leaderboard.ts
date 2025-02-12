
import mongoose from 'mongoose';

const LeaderboardSchema = new mongoose.Schema({
  period: {
    type: String,
    enum: ['weekly', 'monthly', 'all-time'],
    required: true
  },
  rankings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    points: Number
  }],
  startDate: Date,
  endDate: Date
});

export default mongoose.models.Leaderboard || mongoose.model('Leaderboard', LeaderboardSchema);
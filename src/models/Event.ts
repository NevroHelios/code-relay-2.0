
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
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
  startTime: {
    type: Date,
    required: true
  },
  endTime: Date,
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  qrCodeId: {
    type: String,
    unique: true
  },
  pointValue: {
    type: Number,
    default: 100
  }
}, { timestamps: true });

EventSchema.index({ location: '2dsphere' });
EventSchema.index({ startTime: 1 });

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
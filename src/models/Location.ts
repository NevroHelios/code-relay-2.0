// models/Location.ts
import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  qrCodeId: {
    type: String,
    required: true,
    unique: true
  },
  coordinates: {
    type: [Number],
    required: true
  },
  description: String,
  basePointValue: Number
});

LocationSchema.index({ coordinates: '2dsphere' });

export default mongoose.models.Location || mongoose.model('Location', LocationSchema);
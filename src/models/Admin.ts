import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

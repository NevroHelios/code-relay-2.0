import mongoose from 'mongoose';
import { hash } from 'bcryptjs';

const AadharDetailsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minLength: [2, 'First name must be at least 2 characters long'],
    maxLength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minLength: [2, 'Last name must be at least 2 characters long'],
    maxLength: [50, 'Last name cannot exceed 50 characters']
  },
  aadharNumber: {
    type: String,
    required: [true, 'Aadhar number is required'],
    unique: true,
    validate: {
      validator: function(v: string) {
        return /^[0-9]{12}$/.test(v);
      },
      message: 'Please enter a valid 12-digit Aadhar number'
    }
  },
  walletAddress: {
    type: String,
    unique: true
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  hashedAadhar: String
}, { timestamps: true });

// Pre-save middleware to hash Aadhar number
AadharDetailsSchema.pre('save', async function(next) {
  if (this.isModified('aadharNumber')) {
    this.hashedAadhar = await hash(this.aadharNumber, 10);
  }
  next();
});

// Indexes for faster queries
AadharDetailsSchema.index({ aadharNumber: 1 });
AadharDetailsSchema.index({ walletAddress: 1 });

export const AadharDetails = mongoose.models.AadharDetails || 
  mongoose.model('AadharDetails', AadharDetailsSchema);
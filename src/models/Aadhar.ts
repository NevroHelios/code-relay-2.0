import mongoose from 'mongoose';

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
  // aadharNumbers : {
  //   type : String,
  //   enum : ['561999320901'],
  //   required : true
  // },
  isVerified: {
    type : Boolean,
    required : true
  }
}, { timestamps: true });

export const AadharDetails = mongoose.models.AadharDetails || 
  mongoose.model('AadharDetails', AadharDetailsSchema);
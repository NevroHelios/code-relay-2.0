import mongoose from 'mongoose';

const NFTSchema = new mongoose.Schema({
  tokenURI: {
    type: String,
    required: true
  },
  transactionId:{
    type : String,
    required : true
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
  starting : {
    type : Date,
    required : true,
  },
  validity : {
    type : Date,
    required : true
  },
  isClaimed : {
    type : Boolean,
    required : true
  }},
  {timestamps : true}
);

export default mongoose.models.NFT || mongoose.model('NFT', NFTSchema);
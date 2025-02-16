import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in your .env file");
}

async function dbConnect() {
  // Always try to establish a new connection without caching
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.log(error)
  }
}

export default dbConnect;
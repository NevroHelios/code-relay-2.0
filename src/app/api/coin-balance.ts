import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import User from '@/models/User'; // Assuming you have a User model

mongoose.connect(process.env.MONGODB_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.user.id; // Assuming you have user authentication

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, balance: user.coins });
  } catch (error) {
    console.error('Error fetching coin balance:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

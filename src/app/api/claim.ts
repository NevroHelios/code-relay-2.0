import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Reward from '@/models/Reward';
import User from '@/models/User'; // Assuming you have a User model

mongoose.connect(process.env.MONGODB_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { tokenId } = req.body;
    const userId = req.user.id; // Assuming you have user authentication

    try {
      const reward = await Reward.findOne({ 'nftReward.tokenId': tokenId });

      if (!reward) {
        return res.status(404).json({ success: false, message: 'Reward not found' });
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const userClaims = reward.claims.find(claim => claim.userId.toString() === userId && claim.date >= today);

      if (userClaims && userClaims.count >= 5) {
        return res.status(400).json({ success: false, message: 'You have reached the daily claim limit for this NFT' });
      }

      if (userClaims) {
        userClaims.count += 1;
      } else {
        reward.claims.push({ userId, date: new Date(), count: 1 });
      }

      await reward.save();

      const user = await User.findById(userId);
      user.coins += 1;
      await user.save();

      res.status(200).json({ success: true, message: 'NFT claimed successfully' });
    } catch (error) {
      console.error('Error claiming NFT:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

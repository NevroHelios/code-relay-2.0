import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Admin from '../../../models/Admin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === 'POST') {
    const { email, name, image } = req.body;
    if (!email || !name) {
      return res.status(400).json({ error: "Missing parameters" });
    }
    try {
      const admin = await Admin.findOneAndUpdate(
        { email },
        { name, image },
        { new: true, upsert: true }
      );
      return res.status(200).json(admin);
    } catch (error) {
      return res.status(500).json({ error: "Database error" });
    }
  }

  res.setHeader('Allow', ['POST']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}

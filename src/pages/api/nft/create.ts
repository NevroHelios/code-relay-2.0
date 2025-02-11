import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import NFT from '../../../models/NFT';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await dbConnect();

  try {
    const nft = await NFT.create(req.body);
    res.status(201).json(nft);
  } catch (error) {
    res.status(400).json({ error });
  }
}
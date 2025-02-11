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

  try {
    await dbConnect();

    const { tokenId, tokenURI, creator } = req.body;

    // Validate required fields
    if (!tokenId || !tokenURI || !creator) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const nft = await NFT.create({
      tokenId,
      tokenURI,
      creator,
    });

    res.status(201).json(nft);
  } catch (error) {
    console.error('Error creating NFT:', error);
    res.status(500).json({ message: 'Error creating NFT', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
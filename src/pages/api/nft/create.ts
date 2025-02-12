import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import NFT from '../../../models/NFT';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  try {
    await dbConnect();
    const { tokenId, tokenURI, creator, title, description } = req.body;

    if (!tokenId || !tokenURI || !creator || !title || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const nft = await NFT.create({
      tokenId,
      tokenURI,
      creator,
      title,
      description,
    });

    return res.status(201).json(nft);
  } catch (error) {
    console.error('Error creating NFT:', error);
    return res.status(500).json({ message: 'Error creating NFT', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
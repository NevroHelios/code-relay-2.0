import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import NFT from '@/models/NFT';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { tokenId, tokenURI, creator, title, description } = body;

    if (!tokenId || !tokenURI || !creator || !title || !description) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const nftData = {
      tokenId: Number(tokenId),
      tokenURI,
      creator,
      title,
      description
    };

    // Check if NFT with this tokenId already exists
    const existingNFT = await NFT.findOne({ tokenId: nftData.tokenId });
    if (existingNFT) {
      return NextResponse.json(
        { message: "NFT with this tokenId already exists" },
        { status: 400 }
      );
    }

    const nft = await NFT.create(nftData);
    return NextResponse.json(nft, { status: 201 });
  } catch (error) {
    console.error('Error creating NFT:', error);
    return NextResponse.json(
      { 
        message: 'Error creating NFT', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

declare global {
    var _mongoClientPromise: Promise<MongoClient>;
}

const uri = process.env.MONGODB_URI as string;
const options = {};

let client = new MongoClient(uri, options);
let clientPromise: Promise<MongoClient>;

if (!globalThis._mongoClientPromise) {
  globalThis._mongoClientPromise = client.connect();
}
clientPromise = globalThis._mongoClientPromise;

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const nfts = await db.collection('nfts').find({}).toArray();
    return new Response(JSON.stringify(nfts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch NFTs' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import NFT from '@/models/NFT';

export async function GET(request: NextRequest, response : NextResponse) {
  try {
    await dbConnect();

    const allnfts = await NFT.find({});
    return NextResponse.json({success:true, message : "NFTs fetched successfully", nfts : allnfts}, {status : 200});
  } catch(err){
    return NextResponse.json({success : false, message : "Internal Server error"},{status : 500})
  }
}
import { NextRequest, NextResponse } from "next/server";
import NFT from "@/models/NFT";
import dbConnect from "@/lib/mongodb";

export async function POST(request: NextRequest, response : NextResponse) {
  try {
    await dbConnect();
    const {from, tokenURI, transactionId, title, description, expiryDate} = await request.json();

    if (
      !from ||
      !tokenURI ||
      !transactionId ||
      !title ||
      !description ||
      !expiryDate
    ) {
      return NextResponse.json({ error: "Missing reward data" }, { status: 400 });
    }
    const currentDate = new Date();

    const result = new NFT({
      creator : from,
      tokenURI : tokenURI,
      transactionId,
      title,
      description,
      starting : currentDate,
      validity : new Date(currentDate.getTime() + (expiryDate * 24 * 60 * 60 * 1000)),
      isClaimed: false
    });
    await result.save();
    return NextResponse.json({ success : true, message: "Reward saved", id: result.transactionId }, { status: 200 });
  } catch (error) {
    console.error("Error saving reward:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

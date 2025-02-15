import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// Read MongoDB URI and Database name from env variables.
const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Please define the MONGODB_URI in your environment variables.");

const client = new MongoClient(uri);
const databaseName = process.env.MONGODB_DB;

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (
      !data.nftAddress ||
      !data.tokenURI ||
      !data.transactionId ||
      !data.title ||
      !data.description
    ) {
      return NextResponse.json({ error: "Missing reward data" }, { status: 400 });
    }

    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection("rewards");

    const result = await collection.insertOne(data);
    return NextResponse.json({ message: "Reward saved", id: result.insertedId }, { status: 200 });
  } catch (error) {
    console.error("Error saving reward:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Missing MongoDB connection string in MONGODB_URI env variable.");
}
if (!process.env.MONGODB_DB) {
  throw new Error("Missing MongoDB database name in MONGODB_DB env variable.");
}

const uri: string = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!globalThis._mongoClientPromise) {
  client = new MongoClient(uri, options);
  globalThis._mongoClientPromise = client.connect();
}
clientPromise = globalThis._mongoClientPromise as Promise<MongoClient>;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("rewards");
    const result = await collection.insertOne(data);
    return NextResponse.json({
      message: "Reward created successfully",
      rewardId: result.insertedId,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

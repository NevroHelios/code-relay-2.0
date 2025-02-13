import { MongoClient } from 'mongodb';

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

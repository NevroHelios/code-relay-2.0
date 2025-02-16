import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

export async function POST(request: NextRequest, response : NextResponse) {
  try {
    await dbConnect();
    const {walletAddress, contribution} = await request.json();

    if (
      !walletAddress || !contribution
    ) {
      return NextResponse.json({ error: "Reward not available" }, { status: 400 });
    }
    const currentDate = new Date();

    const existing = await User.findOne({
        walletAddress : walletAddress
    });
    let updateduser, points;
    if(existing){
        points = existing.totalPoints;
        updateduser = await User.findOneAndUpdate({
            walletAddress : walletAddress
        }, {
            totalPoints : points + 1,
            $push : {
                verifiedContributions : contribution
            },
            lastActivity : currentDate
        }, {new : true})
        points = existing.totalPoints + 1;
    }else{
        const result = new User({
            walletAddress : walletAddress,
            totalPoints : 1,
            verifiedContributions : [contribution],
            lastActivity : currentDate
        });
        await result.save();
        points = 1;
    }
    return NextResponse.json({ success : true, message: "Reward saved", totalpoints : points}, { status: 200 });
  } catch (error) {
    console.error("Error saving reward:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

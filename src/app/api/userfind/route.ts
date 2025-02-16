import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

export async function POST(request : NextRequest, response : NextResponse){
    try {
        await dbConnect();
        const {walletAddress} = await request.json();
        const myuser :any = await User.findOne({walletAddress : walletAddress})
        console.log(myuser);
        return NextResponse.json({
            success : true, message: "User fetched successfully", user : myuser
        }, {status : 200});
    } catch (error) {
        return NextResponse.json({success: false, message :"Internal server error!"}, {status : 500})
    }
}
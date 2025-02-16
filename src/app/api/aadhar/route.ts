import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { AadharDetails } from '@/models/Aadhar'

export async function POST(req: NextRequest, res : NextResponse) {
  try {
    // Connect to MongoDB
    await dbConnect()

    // Parse the incoming data
    const { firstName, lastName, aadharNumber } = await req.json()

    // Check if the aadharNumber already exists
    const existing = await AadharDetails.findOne({ 
      firstName : firstName,
      lastName : lastName
    })
    if(existing){
      if(existing.isVerified == true){
        return true;
      }
      existing.isVerified = true;
    }
    const newaadhar = new AadharDetails({
      firstName : firstName,
      lastName : lastName,
      isVerified : true
    })
    await newaadhar.save();
    return NextResponse.json({success : true, message : "Aadhar verified successfully!"}, {status : 200})
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success : false, error: 'Internal Server Error' }, { status: 500 })
  }
}
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { AadharDetails } from '@/models/Aadhar'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { firstName, lastName, aadharNumber, walletAddress } = body

    await dbConnect()
    
    const existingUser = await AadharDetails.findOne({ aadharNumber })
    if (existingUser) {
      return NextResponse.json({ error: 'Aadhar number already registered' }, { status: 400 })
    }

    const newUser = await AadharDetails.create({
      firstName,
      lastName,
      aadharNumber,
      walletAddress,
      verificationStatus: 'pending'
    })

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const aadharNumber = searchParams.get('aadharNumber')
    
    await dbConnect()
    
    const user = await AadharDetails.findOne({ aadharNumber })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
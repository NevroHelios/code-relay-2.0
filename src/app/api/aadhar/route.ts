import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { AadharDetails } from '@/models/Aadhar'

export async function POST(req: Request) {
  try {
    // Connect to MongoDB
    await dbConnect()

    // Parse the incoming data
    const { firstName, lastName, aadharNumber } = await req.json()

    // Check if the aadharNumber already exists
    const existing = await AadharDetails.findOne({ aadharNumber })
    if (existing) {
      // Aadhar is not unique, redirect back to "admin-new"
      return NextResponse.redirect(new URL('/admin-new', req.url))
    } else {
      // Aadhar is unique, create the new record
      await AadharDetails.create({ firstName, lastName, aadharNumber })
      // Forward to the login route
      return NextResponse.redirect(new URL('/login', req.url))
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
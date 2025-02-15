import { NextResponse } from 'next/server';
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, message: "No image file received" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');

    // Call FastAPI endpoint
    const apiResponse = await axios.post('https://detect-fastapi.azurewebsites.net/detect', {
      image: `data:image/jpeg;base64,${base64}`
    });

    return NextResponse.json({
      success: apiResponse.data.plastic_garbage === "YES",
      result: apiResponse.data
    });

  } catch (error) {
    console.error('FastAPI Detection Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
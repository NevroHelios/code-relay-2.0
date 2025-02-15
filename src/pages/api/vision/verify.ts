import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import type { Fields, Files } from 'formidable';
import { promises as fs } from 'fs';
import axios from 'axios';

export const config = {
  api: {
    bodyParser: false,
  },
};

function parseForm(req: NextApiRequest): Promise<{ fields: Fields; files: Files }> {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      keepExtensions: true,
      multiples: false,
    });
    
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Form parsing error:", err);
        return reject(err);
      }
      resolve({ fields, files });
    });
  });
}

export default async function(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { files } = await parseForm(req);

    if (!files || !files.image) {
      return res.status(400).json({ success: false, message: "No image file received" });
    }

    const imageFile = files.image;
    const file = Array.isArray(imageFile) ? imageFile[0] : imageFile;

    if (!file || !file.filepath) {
      return res.status(400).json({ success: false, message: "Invalid file received" });
    }

    const fileBuffer = await fs.readFile(file.filepath);
    const fileBase64 = fileBuffer.toString('base64');
    await fs.unlink(file.filepath).catch(console.error);

    // Call FastAPI endpoint
    const apiResponse = await axios.post('https://detect-fastapi.azurewebsites.net/detect', {
      image: `data:image/jpeg;base64,${fileBase64}`
    });

    const detectionResult = apiResponse.data;
    
    return res.status(200).json({
      success: detectionResult.plastic_garbage === "YES",
      result: detectionResult
    });

  } catch (error) {
    console.error('FastAPI Detection Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal Server Error'
    });
  }
}

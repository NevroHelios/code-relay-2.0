import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import type { Fields, Files, File } from 'formidable';
import { promises as fs } from 'fs';
import vision from '@google-cloud/vision';

// Create a Google Cloud Vision client
const client = new vision.ImageAnnotatorClient({
    keyFilename: ""
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to parse form data using formidable
function parseForm(req: NextApiRequest): Promise<{ fields: Fields; files: Files }> {
  return new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }

  try {
    const { files } = await parseForm(req);
    const imageFile = files.image;

    if (!imageFile || Array.isArray(imageFile)) {
      res.status(400).json({ success: false, message: 'Image file not found or invalid' });
      return;
    }

    // Read file into a buffer
    const fileData = await fs.readFile((imageFile as File).filepath);

    // Call Google Vision API; here using label detection as an example.
    const [result] = await client.labelDetection({ image: { content: fileData } });
    const labels = result.labelAnnotations;
    
    // Check if one of the labels indicates plastic waste (e.g., "plastic", "waste", "bottle")
    const targetLabels = ['plastic', 'waste', 'bottle', 'other'];
    const found = labels?.some(label => 
      label.description && targetLabels.some(target => label.description.toLowerCase().includes(target))
    );

    if (found) {
      res.status(200).json({ success: true, labels });
    } else {
      res.status(200).json({ success: false, labels });
    }
  } catch (error) {
    console.error("Error processing image", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import type { Fields, Files } from 'formidable';
import { promises as fs } from 'fs';
import vision from '@google-cloud/vision';

// Initialize Google Cloud Vision client
const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_CLOUD_VISION_KEY_PATH
});

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
      console.log("Parsed files:", files); // Debug log
      resolve({ fields, files });
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Parse the form data
    const { files } = await parseForm(req);
    console.log("Received files:", files); // Debug log

    if (!files || !files.image) {
      console.error("No image file received:", files); // Debug log
      return res.status(400).json({ 
        success: false, 
        message: "No image file received" 
      });
    }

    const imageFile = files.image;
    
    // Handle both single file and array cases
    const file = Array.isArray(imageFile) ? imageFile[0] : imageFile;

    if (!file || !file.filepath) {
      console.error("Invalid file object:", file); // Debug log
      return res.status(400).json({ 
        success: false, 
        message: "Invalid file received" 
      });
    }

    // Read the file
    const fileBuffer = await fs.readFile(file.filepath);
    console.log("File size:", fileBuffer.length); // Debug log

    // Call Vision API
    const [result] = await client.labelDetection({
      image: { content: fileBuffer }
    });

    // Clean up the temporary file
    await fs.unlink(file.filepath).catch(console.error);

    const labels = result.labelAnnotations || [];
    
    // Define target labels for waste detection
    const targetLabels = ['plastic', 'waste', 'bottle', 'garbage', 'trash'];
    const found = labels.some(label => 
      label.description && 
      targetLabels.some(target => 
        label.description.toLowerCase().includes(target)
      )
    );

    return res.status(200).json({
      success: found,
      labels: labels.map(label => ({
        description: label.description,
        score: label.score
      }))
    });

  } catch (error) {
    console.error('Vision API Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal Server Error'
    });
  }
}
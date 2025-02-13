import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import Admin from "@/models/Admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  
  if (req.method === "POST") {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      if (role === "admin") {
        const admin = await Admin.create({ name: username, email, password });
        return res.status(200).json({ message: "Admin registered", admin });
      } else {
        const user = await User.create({ name: username, email, password });
        return res.status(200).json({ message: "User registered", user });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
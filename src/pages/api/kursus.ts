import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../lib/mongodb'
 
type ResponseData = {
  message: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const client = await clientPromise;
  const db = client.db("elearning");

  switch (req.method) {
    case "GET":
      const allPosts = await db.collection("kursus").find({}).toArray();
      res.status(200).json({ status: 200, data: allPosts });
      break;
  }
}
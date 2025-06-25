import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
const client = await clientPromise;
  const db = client.db("elearning");
  switch (req.method) {
    case "GET":
      const kursus = await db.collection("kursus").find({}).toArray();
      res.json({ status: 200, data: kursus });
      break;
  }
}
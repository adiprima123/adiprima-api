import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
const client = await clientPromise;
  const db = client.db("elearning");
  switch (req.method) {
    case "GET":
      const kursus = await db.collection("kursus").find({
            _id: new ObjectId(req.query.id as string)
      }).toArray();
      if (kursus.length === 0) {
        res.status(404).json({ status: 404,data:{}, message: "Kursus not found" });
        return;
      }
      res.json({ status: 200, data: kursus[0] });
      break;
  }
}
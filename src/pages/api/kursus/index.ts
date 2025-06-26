import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const client = await clientPromise;
  const db = client.db("elearning");

  switch (req.method) {
    case "GET":
      try {
        const filter = (req.query.filter as string) || '';
        const options = {
          projection: {
            content: 0 // sembunyikan field "content"
          }
        };

        const kursus = await db.collection("kursus").find({
          title: { $regex: filter, $options: 'i' }
        }, options).toArray();

        res.status(200).json({ status: 200, data: kursus });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        res.status(500).json({ status: 500, message: 'Terjadi kesalahan saat mengambil data.' });
      }
      break;

    default:
      res.status(405).json({ status: 405, message: 'Metode tidak diizinkan' });
      break;
  }
}

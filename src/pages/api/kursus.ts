import type { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const clientPromise = require('../../lib/mongodb'); // perbaikan utama

// Tipe data untuk 1 item kursus
type Kursus = {
  _id: string;
  nama: string;
  deskripsi: string;
};

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("elearning");

    if (req.method === "GET") {
      const allPosts = await db.collection("kursus").find({}).toArray();
      res.status(200).json({
        status: 200,
        data: allPosts as Kursus[],
        message: 'Data berhasil diambil',
      });
    } else {
      res.status(405).json({
        status: 405,
        data: [],
        message: 'Metode tidak diizinkan',
      });
    }

  } catch (error) {
    console.error("Error mengambil data kursus:", error);
    res.status(500).json({
      status: 500,
      data: [],
      message: 'Terjadi kesalahan saat mengambil data',
    });
  }
}

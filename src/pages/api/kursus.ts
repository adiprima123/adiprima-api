import type { NextApiRequest, NextApiResponse } from 'next'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const clientPromise = require('../../lib/mongodb')

type Kursus = {
  _id: string
  nama: string
  deskripsi: string
}

type ApiResponse = {
  status: number
  data: Kursus[] | []
  message: string
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    const client = await clientPromise
    const db = client.db('elearning') // Pastikan nama database kamu benar
    const collection = db.collection('kursus') // Pastikan nama koleksi benar

    if (req.method === 'GET') {
      const allPosts = await collection.find({}).toArray()

      console.log('📦 Data kursus:', allPosts)

      res.status(200).json({
        status: 200,
        data: allPosts,
        message: 'Data berhasil diambil',
      })
    } else {
      res.status(405).json({
        status: 405,
        data: [],
        message: 'Metode tidak diizinkan',
      })
    }
  } catch (error) {
    const err = error as Error
    console.error('❌ ERROR:', err.message)

    res.status(500).json({
      status: 500,
      data: [],
      message: 'Terjadi kesalahan saat mengambil data',
      error: err.message,
    })
  }
}

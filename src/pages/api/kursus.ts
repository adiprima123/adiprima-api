import type { NextApiRequest, NextApiResponse } from 'next'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const clientPromise = require('../../lib/mongodb') // pakai mongodb.js

// Tipe data kursus
type Kursus = {
  _id: string
  nama: string
  deskripsi: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise
    console.log("✅ Connected to MongoDB")

    const db = client.db("elearning") // Pastikan nama database sesuai MongoDB Atlas
    console.log("✅ Connected to DB:", db.databaseName)

    if (req.method === "GET") {
      const allPosts = await db.collection("kursus").find({}).toArray()
      console.log("✅ Data ditemukan:", allPosts.length)

      res.status(200).json({
        status: 200,
        data: allPosts as Kursus[],
        message: 'Data berhasil diambil',
      })
    } else {
      res.status(405).json({
        status: 405,
        data: [],
        message: 'Metode tidak diizinkan',
      })
    }

  } catch (error: unknown) {
    console.error("❌ ERROR:", error)
    newFunction(error)

    res.status(500).json({
      status: 500,
      data: [],
      message: 'Terjadi kesalahan saat mengambil data',
      _error: error || 'Unknown error',
      get error_2() {
        return this._error
      },
      set error_2(value) {
        this._error = value
      },
      get error_1() {
        return this._error
      },
      set error_1(value) {
        this._error = value
      },
      get error() {
        return this._error
      },
      set error(value) {
        this._error = value
      },
    })
  }

  function newFunction(error: unknown) {
    console.error("❌ ERROR MESSAGE:", error)
  }
}

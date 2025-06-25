// lib/mongodb.js
import { MongoClient } from "mongodb";
import { version } from "os";

const uri = process.env.MONGODB_URI; // ex: mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
const options = {
  serverApi: { 
    version: "1",
    strict: true,
    deprecationErrors: true,
  }
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // Cache the client during development to avoid many connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client for every request
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
// lib/db.ts

import { MongoClient, Db, MongoClientOptions } from "mongodb";

let db: Db;

export async function connectToDatabase() {
  console.log(process.env.NEXT_PUBLIC_MONGO_URL);

  if (!db) {
    const client = await MongoClient.connect(
      process.env.NEXT_PUBLIC_MONGO_URL || "",
      {
        useNewUrlParser: true, // Deprecated, but still supported
        useUnifiedTopology: true,
        // Add more options if needed
      } as MongoClientOptions
    ); // Type assertion to MongoClientOptions

    db = client.db("react-flow");
  }
  return db;
}

export function getDatabase() {
  if (!db) {
    throw new Error("You must call connectToDatabase first!");
  }
  return db;
}

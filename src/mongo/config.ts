import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI as string;
const client = new MongoClient(uri);
let db: Db;

export const connectDB = async () => {
  try {
    await client.connect();
    db = client.db(process.env.DATABASE_NAME);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export const getDB = () => db;

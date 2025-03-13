import { MongoClient } from "mongodb";
import { Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI ?? "";
const DB_NAME = process.env.DATABASE_NAME ?? "";

export class MongoDb {
  private static instance: MongoDb;
  private client: MongoClient;
  private db!: Db;
  private isConnected: boolean = false;

  private constructor() {
    this.client = new MongoClient(MONGO_URI);
  }

  static getInstance(): MongoDb {
    if (!MongoDb.instance) {
      MongoDb.instance = new MongoDb();
    }
    return MongoDb.instance;
  }

  async connect() {
    if (!this.isConnected) {
      await this.client.connect();
      this.db = this.client.db(DB_NAME);
      this.isConnected = true;
      console.log(`🚀 MongoDB connected to ${DB_NAME}`);
    }
    return this.db;
  }
}

export const connectDB = async () => {
  return MongoDb.getInstance().connect();
};

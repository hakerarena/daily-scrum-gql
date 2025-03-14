import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI ?? "";
const DB_NAME = process.env.DATABASE_NAME ?? "";

export class MongoDbClient {
  private static instance: MongoDbClient;
  private client: MongoClient;
  private db!: Db;
  private isConnected: boolean = false;

  private constructor() {
    this.client = new MongoClient(MONGO_URI);
  }

  static getInstance(): MongoDbClient {
    if (!MongoDbClient.instance) {
      MongoDbClient.instance = new MongoDbClient();
    }
    return MongoDbClient.instance;
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

  getDb(): Db {
    if (!this.isConnected) {
      throw new Error("MongoDB is not connected");
    }
    return this.db;
  }
}

export const connectDB = async () => {
  return MongoDbClient.getInstance().connect();
};

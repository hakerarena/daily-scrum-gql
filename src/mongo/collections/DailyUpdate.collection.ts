import { Db, Collection, InsertOneResult } from "mongodb";
import { MongoDb } from "../config/connection";
import { DailyUpdateInput } from "../../generated/graphql";
import { transformDailyUpdate } from "../../transformers/DailyUpdate.mapper";

export class DailyUpdate {
  private static instance: DailyUpdate;
  private db!: Db;
  private collection!: Collection;

  private constructor() {}

  static async getInstance(): Promise<DailyUpdate> {
    if (!DailyUpdate.instance) {
      DailyUpdate.instance = new DailyUpdate();
      DailyUpdate.instance.db = await MongoDb.getInstance().connect();
      DailyUpdate.instance.collection =
        DailyUpdate.instance.db.collection("DailyUpdate");
    }
    return DailyUpdate.instance;
  }

  async addDailyUpdate(
    updateData: DailyUpdateInput
  ): Promise<InsertOneResult<Document>> {
    return await this.collection.insertOne(transformDailyUpdate(updateData));
  }
}

import { InsertOneResult } from "mongodb";
import {
  DailyUpdateFilter,
  DailyUpdateInput,
  DailyUpdateModel,
} from "../../generated/graphql";
import { transformDailyUpdate } from "../../transformers/DailyUpdate.mapper";
import { MongoCore } from "../config/MongoCore";
import { CollectionsEnum } from "../config/Collections.enum";

export class DailyUpdateCollection extends MongoCore<DailyUpdateModel> {
  constructor() {
    super(CollectionsEnum.DailyUpdateCollection);
  }

  async addDailyUpdate(
    updateData: DailyUpdateInput
  ): Promise<InsertOneResult<DailyUpdateInput>> {
    return await this.collection.insertOne(transformDailyUpdate(updateData));
  }
}

import {
  DailyUpdateFilter,
  DailyUpdateInput,
  DailyUpdateModel,
  DailyUpdateResponse,
  DailyUpdates,
} from "../generated/graphql";
import to from "await-to-js";
import * as FeatureConstants from "../common/constants";
import { DailyScrumDb } from "../mongo/config/DailyScrumDb";

export class DailyUpdateService {
  async addDailyUpdate(data: DailyUpdateInput): Promise<DailyUpdateResponse> {
    const [error, dailyUpdateResponse] = await to(
      DailyScrumDb.instance.dailyUpdateCollection.addDailyUpdate(data)
    );
    if (error) {
      console.error(error);
      throw new Error(FeatureConstants.FAILED_UPDATE);
    } else {
      const response: DailyUpdateResponse = {
        success: dailyUpdateResponse.acknowledged,
        message: dailyUpdateResponse.acknowledged
          ? FeatureConstants.SUCCESSFULL_UPDATE
          : FeatureConstants.FAILED_UPDATE,
      };
      return response;
    }
  }

  async getAllUpdates(
    filter?: DailyUpdateFilter | null
  ): Promise<DailyUpdates> {
    const [error, dailyUpdates] = await to(
      DailyScrumDb.instance.dailyUpdateCollection.find(
        (filter ?? {}) as Partial<DailyUpdateModel>
      )
    );
    if (error) {
      console.error(error);
      throw new Error(FeatureConstants.FAILED_FETCH);
    }
    return { dailyUpdates: dailyUpdates };
  }
}

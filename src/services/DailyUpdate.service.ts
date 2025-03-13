import { DailyUpdateInput, DailyUpdateResponse } from "../generated/graphql";
import { DailyUpdate } from "../mongo/collections/DailyUpdate.collection";
import to from "await-to-js";
import * as FeatureConstants from "../common/constants";

export class DailyUpdateService {
  private static _instance: DailyUpdateService;
  private static collection: DailyUpdate;

  private constructor() {}

  private async init() {
    if (!DailyUpdateService.collection) {
      DailyUpdateService.collection = await DailyUpdate.getInstance();
    }
  }

  public static async getInstance(): Promise<DailyUpdateService> {
    if (!DailyUpdateService._instance) {
      DailyUpdateService._instance = new DailyUpdateService();
      await DailyUpdateService._instance.init();
    }
    return DailyUpdateService._instance;
  }

  async addDailyUpdate(data: DailyUpdateInput): Promise<DailyUpdateResponse> {
    const [error, dailyUpdateResponse] = await to(
      DailyUpdateService.collection.addDailyUpdate(data)
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
}

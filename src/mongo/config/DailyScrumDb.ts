import { DailyUpdateCollection } from "../collections/DailyUpdate.collection";

export class DailyScrumDb {
  private static _instance: DailyScrumDb;
  private _dailyUpdateCollection: DailyUpdateCollection;

  private constructor() {
    this._dailyUpdateCollection = new DailyUpdateCollection();
  }

  public static get instance(): DailyScrumDb {
    if (!DailyScrumDb._instance) {
      DailyScrumDb._instance = new DailyScrumDb();
    }
    return DailyScrumDb._instance;
  }

  get dailyUpdateCollection() {
    return this._dailyUpdateCollection;
  }
}

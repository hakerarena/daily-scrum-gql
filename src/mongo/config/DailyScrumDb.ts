import { DailyUpdateCollection } from "../collections/DailyUpdate.collection";
import { UserDetailsCollection } from "../collections/UserDetails.collection";

export class DailyScrumDb {
  private static _instance: DailyScrumDb;
  private _dailyUpdateCollection: DailyUpdateCollection;
  private _userDetailsCollection: UserDetailsCollection;

  private constructor() {
    this._dailyUpdateCollection = new DailyUpdateCollection();
    this._userDetailsCollection = new UserDetailsCollection();
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

  get userDetailsCollection() {
    return this._userDetailsCollection;
  }
}

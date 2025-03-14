import { UserDetail, UserInput } from "../../generated/graphql";
import { MongoCore } from "../config/MongoCore";
import { CollectionsEnum } from "../config/Collections.enum";

export class UserDetailsCollection extends MongoCore<UserDetail> {
  constructor() {
    super(CollectionsEnum.UserDetailsCollection);
  }
}

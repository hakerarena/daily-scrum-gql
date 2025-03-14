import to from "await-to-js";
import {
  UserInput,
  UserType,
  UserVerificationResponse,
} from "../generated/graphql";
import { DailyScrumDb } from "../mongo/config/DailyScrumDb";
import * as FeatureConstants from "../common/constants";

export class UserDetailsService {
  async verifyUser(userInput: UserInput): Promise<UserVerificationResponse> {
    const [error, user] = await to(
      DailyScrumDb.instance.userDetailsCollection.findOne(userInput)
    );
    if (user) {
      return {
        verificationStatus: true,
        userType: user.userType,
      };
    } else {
      console.log(FeatureConstants.USER_NOT_FOUND);
      return {
        verificationStatus: false,
        userType: UserType.Invalid,
      };
    }
  }
}

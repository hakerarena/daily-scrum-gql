import to from "await-to-js";
import {
  RegisterUserInput,
  UserDetail,
  UserInput,
  UserRegistrationResponse,
  UserType,
  UserVerificationResponse,
} from "../generated/graphql";
import { DailyScrumDb } from "../mongo/config/DailyScrumDb";
import * as FeatureConstants from "../common/constants";

export class UserDetailsService {
  async findUserByEmail(email: string): Promise<UserDetail | null> {
    const [error, user] = await to(
      DailyScrumDb.instance.userDetailsCollection.findOne({
        email: email,
      })
    );
    if (user) {
      console.log(FeatureConstants.SUCCESSFULL_FETCH);
      return user;
    } else {
      console.log(error);
      console.log(FeatureConstants.USER_NOT_FOUND);
      return null;
    }
  }

  async verifyUser(userInput: UserInput): Promise<UserVerificationResponse> {
    const user = await this.findUserByEmail(userInput.email);
    if (!user) {
      console.log(FeatureConstants.FAILED_USER_VERIFICATION);
      return {
        verificationStatus: false,
        userType: UserType.Invalid,
      };
    }

    if (user.password === userInput.password) {
      console.log(FeatureConstants.SUCCESSFULL_USER_VERIFICATION);
      return {
        verificationStatus: true,
        userType: user.userType,
      };
    } else {
      console.log(FeatureConstants.INVALID_PASSWORD);
      return {
        verificationStatus: false,
        userType: UserType.Invalid,
      };
    }
  }

  async registerUser(
    userInput: RegisterUserInput
  ): Promise<UserRegistrationResponse> {
    const existingUser = await this.findUserByEmail(userInput.email);
    if (existingUser) {
      return {
        success: false,
        message: FeatureConstants.USER_ALREADY_EXISTS,
      };
    }

    const [error, response] = await to(
      DailyScrumDb.instance.userDetailsCollection.insertOne(userInput)
    );
    if (response) {
      console.log(FeatureConstants.SUCCESSFULL_USER_CREATION);
      return {
        success: true,
        message: FeatureConstants.SUCCESSFULL_USER_CREATION,
      };
    } else {
      console.log(error);
      console.log(FeatureConstants.FAILED_USER_CREATION);
      return {
        success: false,
        message: FeatureConstants.FAILED_USER_CREATION,
      };
    }
  }
}

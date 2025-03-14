import { Resolvers } from "./generated/graphql";
import { DailyUpdateService } from "./services/DailyUpdate.service";
import { UserDetailsService } from "./services/UserDetails.service";

export const resolvers: Resolvers = {
  Query: {
    getAllUpdates: async (_, { filter }) => {
      return await new DailyUpdateService().getAllUpdates(filter);
    },
    verifyUser: async (_, { user }) => {
      return await new UserDetailsService().verifyUser(user);
    },
  },
  Mutation: {
    addDailyUpdate: async (_, { input }) => {
      return await new DailyUpdateService().addDailyUpdate(input);
    },
    registerUser: async (_, { input }) => {
      return await new UserDetailsService().registerUser(input);
    },
  },
};

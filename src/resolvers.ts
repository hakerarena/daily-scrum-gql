import { Resolvers } from "./generated/graphql";
import { DailyUpdateService } from "./services/DailyUpdate.service";

export const resolvers: Resolvers = {
  Query: {
    getAllUpdates: async (_, { filter }) => {
      return await new DailyUpdateService().getAllUpdates(filter);
    },
  },
  Mutation: {
    addDailyUpdate: async (_, { input }) => {
      return await new DailyUpdateService().addDailyUpdate(input);
    },
  },
};

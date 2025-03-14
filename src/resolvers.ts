import { Resolvers } from "./generated/graphql";
import { DailyUpdateService } from "./services/DailyUpdate.service";

export const resolvers: Resolvers = {
  Mutation: {
    addDailyUpdate: async (_, { input }) => {
      return await new DailyUpdateService().addDailyUpdate(input);
    },
  },
};

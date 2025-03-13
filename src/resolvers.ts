import { Resolvers } from "./generated/graphql";
import { DailyUpdateService } from "./services/DailyUpdate.service";

export const resolvers: Resolvers = {
  Mutation: {
    addDailyUpdate: async (_, { input }) => {
      const service = await DailyUpdateService.getInstance();
      return service.addDailyUpdate(input);
    },
  },
};

import { DailyUpdateInput, DailyUpdateModel } from "../generated/graphql";

export function transformDailyUpdate(dailyUpdateInput: DailyUpdateInput) {
  const dailyUpdateModel: DailyUpdateModel = {
    ...dailyUpdateInput,
    createTimeStamp: new Date().toISOString(),
    createdBy: "system",
  };
  return dailyUpdateModel;
}

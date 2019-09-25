import R from "ramda";
import agent from "./agent";

const BASE_CONFIG = {
  organization: process.env.ORGANIZATION,
  project: process.env.PROJECT
};

export const parseBuilds: (
  data: IBuildReport
) => Array<IBuild> = R.prop("value");

export default (definitions: Array<number>, maxDate: Date) =>
  agent
    .fetchBuilds({
      ...BASE_CONFIG,
      definitions,
      maxTime: maxDate.toISOString()
    })
    .then(parseBuilds)

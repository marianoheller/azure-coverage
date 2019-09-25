import R from "ramda";
import agent from "./agent";

const BASE_CONFIG = {
  organization: process.env.ORGANIZATION,
  project: process.env.PROJECT
};

export const parseBuilds: (
  data: IBuildReport
) => Array<number> = R.compose(
  R.map(Number),
  R.map(R.prop("id")),
  R.prop("value")
);

export default (definitions: Array<number>) =>
  agent
    .fetchBuilds({
      ...BASE_CONFIG,
      definitions
    })
    .then(parseBuilds)

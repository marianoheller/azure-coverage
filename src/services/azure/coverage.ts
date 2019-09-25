import R from "ramda";
import agent from "./agent";

const BASE_CONFIG = {
  organization: process.env.ORGANIZATION,
  project: process.env.PROJECT,
};

export const parseCodeCoverage: (data: ICoverageReport) => number = R.compose(
  R.head, // TODO: check this. Why is it an array in the first place?
  R.filter(R.is(Number)),
  R.map(
    R.compose(
      (stats: ICoverageStats | undefined) =>
        stats ? stats.covered / stats.total : undefined,
      R.find((stats: ICoverageStats) => stats.label === "Lines"),
      (data: IConverageData) => data.coverageStats
    )
  ),
  R.prop("coverageData")
);

export default (buildId: number) =>
  agent
    .fetchCodeCoverage({
      ...BASE_CONFIG,
      buildId
    })
    .then(parseCodeCoverage)

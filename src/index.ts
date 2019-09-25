require("dotenv").config();
import subWeeks from "date-fns/subWeeks";
import chalk from "chalk";
import * as coverage from "./modules/coverage";

main();

// ===========================================================

async function main() {
  try {
    /* const results = await coverage.getProjectsCoverage();
    prettyPrint(results); */

    const results2 = await coverage.getProjectsCoverageComparison(
      subWeeks(Date.now(), 2)
    );
    prettyPrint2(results2);
  } catch (err) {
    console.error(err.message);
  }
}

function prettifyCoverage(coverage: number): string {
  return (coverage * 100).toFixed(2);
}

function prettyPrint(results: Array<IResult>) {
  results.forEach((r: IResult) => {
    if (!r) return;
    const coverage = prettifyCoverage(r.coverage);
    console.log(`${r.name}: ${chalk.bold(coverage)}%`);
  });
}

function prettyPrint2(results: Array<IResultComparison>) {
  results.forEach((r: IResultComparison) => {
    if (!r) return;
    const coverageBefore = prettifyCoverage(r.coverageBefore);
    const coverageAfter = prettifyCoverage(r.coverageAfter);
    const _diff = r.coverageAfter - r.coverageBefore;
    const smartColor = _diff >= 0 ? chalk.green : chalk.red;
    const difference = prettifyCoverage(_diff);
    console.log(
      `${r.name}: ${chalk.bold(coverageAfter)}% / ${chalk.grey(
        coverageBefore
      )}% / ${smartColor(difference)}%`
    );
  });
}

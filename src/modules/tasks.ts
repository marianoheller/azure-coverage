import chalk from "chalk";
import subWeeks from "date-fns/subWeeks";
import * as coverage from "./coverage";

export function parseArgs(argv: any) {
  if (!Object.keys(argv).length) return simpleCoverageReport;
  if (argv.d) return comparisonCoverageReport;
  return simpleCoverageReport;
}

// =============================================
// Tasks
async function simpleCoverageReport() {
  const results = await coverage.getProjectsCoverage();
  prettyPrint(results);
}

async function comparisonCoverageReport() {
  const results2 = await coverage.getProjectsCoverageComparison(
    subWeeks(Date.now(), 2)
  );
  prettyPrint2(results2);
}

// =============================================
// Helpers
// TODO: improve printers (table print??)
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

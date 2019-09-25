require("dotenv").config();
import * as coverage from "./modules/coverage";
import chalk from 'chalk';

main();

// ===========================================================

async function main() {
  try {
    const results = await coverage.getProjectsCoverage();
    prettyPrint(results);
  } catch (err) {
    console.error(err.message);
  }
}

function prettyPrint(results: Array<IResult | undefined>) {
  results.forEach((r: IResult | undefined) => {
    if (!r) return;
    const coverage = (r.coverage * 100).toFixed(2)
    console.log(`${r.name}: ${chalk.bold(coverage)}%`);
  });
}

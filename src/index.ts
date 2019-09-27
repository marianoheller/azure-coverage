require("dotenv").config();
import { argv } from "yargs";
import { parseArgs } from "./modules/tasks";
import * as coverage from "./modules/coverage";

async function main() {
  try {
    const task = parseArgs(argv);
    await task();
  } catch (err) {
    console.error(err.message);
  }
}

main();
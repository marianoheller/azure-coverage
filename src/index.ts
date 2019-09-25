require("dotenv").config();
import R from "ramda";
import azure from "./services/azure";
import { allSkippingErrors } from "./utils";

main();

// ===========================================================

async function main() {
  try {
    const definitions = await azure.definition();
    if (!definitions) throw Error("No definitions");

    const defIds = definitions.map(R.prop("id"));
    const builds = await azure.build(defIds);
    if (!builds) throw Error("No builds");

    const coverages = await Promise.all(
      builds.map((bId: number) => azure.coverage(bId))
    );

    const result = coverages
      .map((c, i) =>
        !c
          ? undefined
          : {
              name: definitions[i].name,
              coverage: c
            }
      )
      .filter(Boolean);

    console.log("RESULT", result);
  } catch (err) {
    console.error(err.message);
  }
}

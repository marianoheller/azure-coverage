import R from "ramda";
import azure from "../services/azure";

export function mergeResultsForComparison(
  before: Array<IResult | undefined>,
  after: Array<IResult | undefined>
): Array<IResultComparison> {
  const merge: (
    arrays: Array<Array<IResult>>
  ) => Array<IResultComparison> = R.pipe(
    R.map(R.indexBy(R.prop("id"))),
    R.reduce(R.mergeWith(R.merge), {}),
    R.values
  );
  return merge([before, after]);
}

async function getDefinitions() {
  const definitions = await azure.definition();
  if (!definitions) throw Error("No definitions");
  return definitions;
}

async function _getProjectsCoverage(
  definitions: Array<IDefinition>,
  maxDate: Date
): Promise<Array<IResult | undefined>> {
  const defIds = definitions.map(R.prop("id"));
  const builds = await azure.build(defIds, maxDate);
  if (!builds) throw Error("No builds");

  const coverages = await Promise.all(
    builds.map((build: IBuild) => azure.coverage(build.id))
  );
  if (!coverages) throw Error("No coverages");

  return coverages.map((c, i) =>
    !c
      ? undefined
      : {
          id: builds[i].definition.id,
          name: builds[i].definition.name,
          coverage: c
        }
  );
}

export async function getProjectsCoverage(
  maxDate: Date = new Date()
): Promise<Array<IResult | undefined>> {
  const definitions = await getDefinitions();
  return _getProjectsCoverage(definitions, maxDate);
}

export async function getProjectsCoverageComparison(
  dateBefore: Date = new Date(),
  dateAfter: Date = new Date()
): Promise<Array<IResultComparison | undefined>> {
  const definitions = await getDefinitions();
  const resultsBefore = await _getProjectsCoverage(definitions, dateBefore);
  const resultsAfter = await _getProjectsCoverage(definitions, dateAfter);
  return mergeResultsForComparison(resultsBefore, resultsAfter);
}

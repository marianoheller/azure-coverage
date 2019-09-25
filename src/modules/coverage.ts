import R from "ramda";
import azure from "../services/azure";

export function mergeResultsForComparison(
  before: Array<IResult>,
  after: Array<IResult>
): Array<IResultComparison> {
  const merge: (
    arrays: Array<Array<IResult>>
  ) => Array<IResultComparison> = R.pipe(
    R.map(R.indexBy((r: IResult) => String(r.id))),
    R.reduce(R.mergeWith((b: IResult, a: IResult): IResultComparison => ({
      id: a.id,
      name: a.name,
      coverageBefore: b.coverage,
      coverageAfter: a.coverage
    })), {}),
    R.values
  );
  return merge([before, after]).filter(r => !R.isNil(r.coverageAfter) && !R.isNil(r.coverageBefore));
}

async function getDefinitions() {
  const definitions = await azure.definition();
  if (!definitions) throw Error("No definitions");
  return definitions;
}

async function _getProjectsCoverage(
  definitions: Array<IDefinition>,
  maxDate: Date
): Promise<Array<IResult>> {
  const defIds = definitions.map(R.prop("id"));
  const builds = await azure.build(defIds, maxDate);
  if (!builds) throw Error("No builds");

  const coverages = await Promise.all(
    builds.map((build: IBuild) => azure.coverage(build.id))
  );
  if (!coverages) throw Error("No coverages");

  return coverages
    .map((c, i) => ({
      id: builds[i].definition.id,
      name: builds[i].definition.name,
      coverage: c
    }))
    .filter(r => !R.isNil(r.coverage));
}

export async function getProjectsCoverage(
  maxDate: Date = new Date
): Promise<Array<IResult>> {
  const definitions = await getDefinitions();
  return _getProjectsCoverage(definitions, maxDate);
}

export async function getProjectsCoverageComparison(
  dateBefore: Date,
  dateAfter: Date = new Date()
): Promise<Array<IResultComparison>> {
  if (!dateBefore) throw Error('dateBefore is required!');
  const definitions = await getDefinitions();
  const [resultsBefore, resultsAfter] = await Promise.all([
    _getProjectsCoverage(definitions, dateBefore),
    _getProjectsCoverage(definitions, dateAfter)
  ]);
  return mergeResultsForComparison(resultsBefore, resultsAfter);
}

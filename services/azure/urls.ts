export const BASE_URL = "https://dev.azure.com";

interface ICodeCoverage {
  organization: string | undefined;
  project: string;
  buildId: number;
  flags: number;
}

export const codeCoverage = ({
  organization = "INVALID_ORGANIZATION",
  project,
  buildId,
  flags
}: ICodeCoverage) =>
  `/${organization}/${project}/_apis/test/codecoverage?buildId=${buildId}&flags=${flags}&api-version=5.1-preview.1`;

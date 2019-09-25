import axios from "axios";
const BASE_URL = "https://dev.azure.com";

// ========================================
// Instance
const instance = axios.create({
  baseURL: BASE_URL
});

instance.defaults.headers.common["Authorization"] =
  "Basic " + new Buffer("PAT:" + process.env.AUTH_TOKEN).toString("base64");

// ========================================
// Coverage
const codeCoverage = ({
  organization = "INVALID_ORGANIZATION",
  project = "INVALID_PROJECT",
  buildId
}: ICoverageOptions) =>
  `/${organization}/${project}/_apis/test/codecoverage?buildId=${buildId}&api-version=5.1-preview.1`;

// ========================================
// Definitions
const definitions = ({
  organization = "INVALID_ORGANIZATION",
  project = "INVALID_PROJECT"
}: IDefinitionOptions) =>
  `/${organization}/${project}/_apis/build/definitions?api-version=5.1&repositoryType	=build`;

// ========================================
// Build
const builds = ({
  organization = "INVALID_ORGANIZATION",
  project = "INVALID_PROJECT",
  definitions,
  maxTime
}: IBuildOptions) =>
  `https://dev.azure.com/${organization}/${project}/_apis/build/builds?api-version=5.1&maxBuildsPerDefinition=1&queryOrder=finishTimeDescending&definitions=${definitions}&maxTime=${maxTime}`;

export default {
  fetchCodeCoverage: (config: ICoverageOptions) =>
    instance.get(codeCoverage(config)).then(result => result.data),
  fetchDefinitions: (config: IDefinitionOptions) =>
    instance.get(definitions(config)).then(result => result.data),
  fetchBuilds: (config: IBuildOptions) =>
    instance.get(builds(config)).then(result => result.data)
};

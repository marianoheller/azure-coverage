"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var BASE_URL = "https://dev.azure.com";
// ========================================
// Instance
var instance = axios_1.default.create({
    baseURL: BASE_URL
});
instance.defaults.headers.common["Authorization"] =
    "Basic " + new Buffer("PAT:" + process.env.AUTH_TOKEN).toString("base64");
// ========================================
// Coverage
var codeCoverage = function (_a) {
    var _b = _a.organization, organization = _b === void 0 ? "INVALID_ORGANIZATION" : _b, _c = _a.project, project = _c === void 0 ? "INVALID_PROJECT" : _c, buildId = _a.buildId;
    return "/" + organization + "/" + project + "/_apis/test/codecoverage?buildId=" + buildId + "&api-version=5.1-preview.1";
};
// ========================================
// Definitions
var definitions = function (_a) {
    var _b = _a.organization, organization = _b === void 0 ? "INVALID_ORGANIZATION" : _b, _c = _a.project, project = _c === void 0 ? "INVALID_PROJECT" : _c;
    return "/" + organization + "/" + project + "/_apis/build/definitions?api-version=5.1&repositoryType\t=build";
};
// ========================================
// Build
var builds = function (_a) {
    var _b = _a.organization, organization = _b === void 0 ? "INVALID_ORGANIZATION" : _b, _c = _a.project, project = _c === void 0 ? "INVALID_PROJECT" : _c, definitions = _a.definitions;
    return "https://dev.azure.com/" + organization + "/" + project + "/_apis/build/builds?api-version=5.1&maxBuildsPerDefinition=1&queryOrder=finishTimeDescending&definitions=" + definitions;
};
exports.default = {
    fetchCodeCoverage: function (config) {
        return instance.get(codeCoverage(config)).then(function (result) { return result.data; });
    },
    fetchDefinitions: function (config) {
        return instance.get(definitions(config)).then(function (result) { return result.data; });
    },
    fetchBuilds: function (config) {
        return instance.get(builds(config)).then(function (result) { return result.data; });
    },
};

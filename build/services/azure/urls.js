"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_URL = "https://dev.azure.com";
exports.codeCoverage = function(_a) {
  var _b = _a.organization,
    organization = _b === void 0 ? "INVALID_ORGANIZATION" : _b,
    project = _a.project,
    buildId = _a.buildId,
    flags = _a.flags;
  return (
    "/" +
    organization +
    "/" +
    project +
    "/_apis/test/codecoverage?buildId=" +
    buildId +
    "&flags=" +
    flags +
    "&api-version=5.1-preview.1"
  );
};

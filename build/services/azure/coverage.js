"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = __importDefault(require("ramda"));
var agent_1 = __importDefault(require("./agent"));
var BASE_CONFIG = {
    organization: process.env.ORGANIZATION,
    project: process.env.PROJECT,
};
exports.parseCodeCoverage = ramda_1.default.compose(ramda_1.default.head, // TODO: check this. Why is it an array in the first place?
ramda_1.default.filter(ramda_1.default.is(Number)), ramda_1.default.map(ramda_1.default.compose(function (stats) {
    return stats ? stats.covered / stats.total : undefined;
}, ramda_1.default.find(function (stats) { return stats.label === "Lines"; }), function (data) { return data.coverageStats; })), ramda_1.default.prop("coverageData"));
exports.default = (function (buildId) {
    return agent_1.default
        .fetchCodeCoverage(__assign(__assign({}, BASE_CONFIG), { buildId: buildId }))
        .then(exports.parseCodeCoverage);
});

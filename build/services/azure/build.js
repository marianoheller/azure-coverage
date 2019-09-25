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
    project: process.env.PROJECT
};
exports.parseBuilds = ramda_1.default.prop("value");
exports.default = (function (definitions, maxDate) {
    return agent_1.default
        .fetchBuilds(__assign(__assign({}, BASE_CONFIG), { definitions: definitions, maxTime: maxDate.toISOString() }))
        .then(exports.parseBuilds);
});

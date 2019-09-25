"use strict";
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
exports.parseDefinitions = ramda_1.default.compose(ramda_1.default.map(function (def) { return ({
    id: def.id,
    name: def.name
}); }), ramda_1.default.prop("value"));
exports.default = (function () {
    return agent_1.default
        .fetchDefinitions(BASE_CONFIG)
        .then(exports.parseDefinitions);
});

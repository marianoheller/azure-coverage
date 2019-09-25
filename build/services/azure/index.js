"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var definition_1 = __importDefault(require("./definition"));
var build_1 = __importDefault(require("./build"));
var coverage_1 = __importDefault(require("./coverage"));
exports.default = {
    definition: definition_1.default,
    build: build_1.default,
    coverage: coverage_1.default
};

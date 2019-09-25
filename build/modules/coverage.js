"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = __importDefault(require("ramda"));
var azure_1 = __importDefault(require("../services/azure"));
function getDefinitions() {
    return __awaiter(this, void 0, void 0, function () {
        var definitions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, azure_1.default.definition()];
                case 1:
                    definitions = _a.sent();
                    if (!definitions)
                        throw Error("No definitions");
                    return [2 /*return*/, definitions];
            }
        });
    });
}
function _getProjectsCoverage(definitions, maxDate) {
    return __awaiter(this, void 0, void 0, function () {
        var defIds, builds, coverages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    defIds = definitions.map(ramda_1.default.prop("id"));
                    return [4 /*yield*/, azure_1.default.build(defIds, maxDate)];
                case 1:
                    builds = _a.sent();
                    if (!builds)
                        throw Error("No builds");
                    return [4 /*yield*/, Promise.all(builds.map(function (build) { return azure_1.default.coverage(build.id); }))];
                case 2:
                    coverages = _a.sent();
                    if (!coverages)
                        throw Error("No coverages");
                    return [2 /*return*/, coverages.map(function (c, i) {
                            return !c
                                ? undefined
                                : {
                                    name: builds[i].definition.name,
                                    coverage: c
                                };
                        })];
            }
        });
    });
}
exports._getProjectsCoverage = _getProjectsCoverage;
function getProjectsCoverage(maxDate) {
    if (maxDate === void 0) { maxDate = new Date(); }
    return __awaiter(this, void 0, void 0, function () {
        var definitions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getDefinitions()];
                case 1:
                    definitions = _a.sent();
                    return [2 /*return*/, _getProjectsCoverage(definitions, maxDate)];
            }
        });
    });
}
exports.getProjectsCoverage = getProjectsCoverage;
// TODO: this
function getProjectsCoverageComparison(date1, date2) {
    if (date1 === void 0) { date1 = new Date(); }
    if (date2 === void 0) { date2 = new Date(); }
    return __awaiter(this, void 0, void 0, function () {
        var definitions, defIds, builds, coverages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getDefinitions()];
                case 1:
                    definitions = _a.sent();
                    defIds = definitions.map(ramda_1.default.prop("id"));
                    return [4 /*yield*/, azure_1.default.build(defIds, date1)];
                case 2:
                    builds = _a.sent();
                    if (!builds)
                        throw Error("No builds");
                    return [4 /*yield*/, Promise.all(builds.map(function (build) { return azure_1.default.coverage(build.id); }))];
                case 3:
                    coverages = _a.sent();
                    if (!coverages)
                        throw Error("No coverages");
                    return [2 /*return*/, coverages.map(function (c, i) {
                            return !c
                                ? undefined
                                : {
                                    name: builds[i].definition.name,
                                    coverage: c
                                };
                        })];
            }
        });
    });
}
exports.getProjectsCoverageComparison = getProjectsCoverageComparison;

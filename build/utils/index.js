"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function allSkippingErrors(promises) {
    return Promise.all(promises.map(function (p) { return p.catch(function () { return null; }); }));
}
exports.allSkippingErrors = allSkippingErrors;

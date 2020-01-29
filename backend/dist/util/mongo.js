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
Object.defineProperty(exports, "__esModule", { value: true });
var toMongoRegex = function (_a) {
    var _b;
    var fieldName = _a[0], regex = _a[1];
    return ((_b = {}, _b[fieldName] = { $regex: RegExp(regex), $options: 'i' }, _b));
};
var toMongoRegexQuery = function (queryParams) { return (Object.entries(queryParams)
    .map(toMongoRegex)
    .reduce(function (previous, current) { return (__assign(__assign({}, previous), current)); }, {})); };
exports.toMongoRegexQuery = toMongoRegexQuery;

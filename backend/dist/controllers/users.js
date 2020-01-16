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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var repository_1 = require("../services/repository");
var parcelService_1 = require("../services/parcelService");
var login_1 = require("./login");
var logging_1 = require("../logging");
var updateUserData = function (req, res) {
    var _a = req.body, userId = _a.userId, fieldsToUpdate = __rest(_a, ["userId"]);
    var callback = function (error, user) {
        if (error) {
            logging_1.logger.error(error);
            return res.status(500).json({ error: 'an error occured' });
        }
        parcelService_1.parcelService.broadcastContactListUpdateToUserContacts(userId);
        return res.json(login_1.toCredentials(__assign(__assign({}, login_1.toCredentials(user)), fieldsToUpdate)));
    };
    repository_1.repository.updateUser(callback, userId, fieldsToUpdate);
};
exports.updateUserData = updateUserData;
var findUsers = function (req, res) {
    var query = req.body.query;
    repository_1.repository.findUsersByName(query, function (error, data) { return ((error)
        ? res.json({ result: [] })
        : res.json({ result: data.map(login_1.toCredentials) })); });
};
exports.findUsers = findUsers;
var addUserToContactList = function (req, res) {
    var _a = req.body, userId = _a.userId, userToAdd = _a.userToAdd;
    repository_1.repository.addUserToContactList(userId, userToAdd, function () {
        parcelService_1.parcelService.deliverContactListParcel(userId);
        res.json({});
    });
};
exports.addUserToContactList = addUserToContactList;
var removeUserFromContactList = function (req, res) {
    var _a = req.body, userId = _a.userId, userToRemove = _a.userToRemove;
    repository_1.repository.removeUserFromContactList(userId, userToRemove, function () {
        parcelService_1.parcelService.deliverContactListParcel(userId);
        res.json({});
    });
};
exports.removeUserFromContactList = removeUserFromContactList;

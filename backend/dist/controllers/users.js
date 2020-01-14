"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var repository_1 = require("../services/repository");
var parcelService_1 = require("../services/parcelService");
var login_1 = require("./login");
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

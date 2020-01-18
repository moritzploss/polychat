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
var v4_1 = require("uuid/v4");
var webSocketService_1 = require("../services/webSocketService");
var getParcel = function (type, receiverId, senderId) {
    if (receiverId === void 0) { receiverId = 'all'; }
    if (senderId === void 0) { senderId = 'system'; }
    return ({
        timeStamp: new Date().toISOString(),
        type: type,
        receiverId: receiverId,
        senderId: senderId,
    });
};
exports.getParcel = getParcel;
var directMessageParcel = function (userId, message) { return (__assign(__assign({}, getParcel('DIRECT MESSAGE', userId)), { message: message, read: false, id: v4_1.default() })); };
exports.directMessageParcel = directMessageParcel;
var messageHistoryParcel = function (userId, messages) { return (__assign(__assign({}, getParcel('REPLACE MESSAGE HISTORY', userId)), { messages: messages })); };
exports.messageHistoryParcel = messageHistoryParcel;
var connectedUserParcel = function (userId) { return (__assign(__assign({}, getParcel('UPDATE CONNECTED USERS', userId)), { connectedUsers: webSocketService_1.webSocketService.getConnectedUsers() })); };
exports.connectedUserParcel = connectedUserParcel;
var contactListParcel = function (userId, contactList) { return (__assign(__assign({}, getParcel('UPDATE CONTACTLIST', userId)), { contactList: contactList, connectedUsers: webSocketService_1.webSocketService.getConnectedUsers() })); };
exports.contactListParcel = contactListParcel;

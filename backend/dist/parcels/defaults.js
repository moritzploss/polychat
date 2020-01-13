"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parcelService_1 = require("../services/parcelService");
var webSocketService_1 = require("../services/webSocketService");
var messageHistoryParcel = function (userId, messages) { return parcelService_1.createParcel({
    type: 'REPLACE MESSAGE HISTORY',
    receiverId: userId,
    body: {
        messages: messages,
    },
}); };
exports.messageHistoryParcel = messageHistoryParcel;
var connectedUserParcel = function (userId) { return parcelService_1.createParcel({
    type: 'UPDATE CONNECTED USERS',
    receiverId: userId,
    body: {
        connectedUsers: webSocketService_1.webSocketService.getConnectedUsers(),
    },
}); };
exports.connectedUserParcel = connectedUserParcel;
var contactListParcel = function (userId, contactList) { return parcelService_1.createParcel({
    type: 'UPDATE CONTACTLIST',
    receiverId: userId,
    body: {
        contactList: contactList,
        connected: webSocketService_1.webSocketService.getConnectedUsers(),
    },
}); };
exports.contactListParcel = contactListParcel;

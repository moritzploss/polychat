"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parcelService_1 = require("../services/parcelService");
var webSocketService_1 = require("../services/webSocketService");
var messageHistoryParcel = function (userId, messages) { return parcelService_1.createParcel({
    type: 'UPDATE MESSAGES',
    receiverId: userId,
    body: {
        messages: messages,
    },
}); };
exports.messageHistoryParcel = messageHistoryParcel;
var contactListParcel = function (userId, contactList) { return parcelService_1.createParcel({
    type: 'UPDATE CONTACTLIST',
    receiverId: userId,
    body: {
        contactList: contactList,
        connected: webSocketService_1.webSocketService.getConnectedUsers(),
    },
}); };
exports.contactListParcel = contactListParcel;

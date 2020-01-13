"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parcelService_1 = require("../services/parcelService");
var webSocketService_1 = require("../services/webSocketService");
var contactListParcel = function () { return parcelService_1.createParcel({
    type: 'UPDATE CONNECTED USERS',
    senderId: 'system',
    body: {
        connectedUsers: webSocketService_1.webSocketService.getConnectedUsers(),
    },
}); };
exports.contactListParcel = contactListParcel;
var setupParcel = function (userId, messages) { return parcelService_1.createParcel({
    type: 'SETUP CLIENT',
    receiverId: userId,
    body: {
        messages: messages,
    },
}); };
exports.setupParcel = setupParcel;

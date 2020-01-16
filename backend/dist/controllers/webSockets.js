"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logging_1 = require("../logging");
var parcelService_1 = require("../services/parcelService");
var blueprints_1 = require("../parcels/blueprints");
var webSocketService_1 = require("../services/webSocketService");
var authenticateWebSocket = function (webSocket, req, next) { return ((req.params.id.startsWith(req.session.userId) && req.session.authorized)
    ? next()
    : webSocket.close()); };
exports.authenticateWebSocket = authenticateWebSocket;
var onOpen = function (webSocket, webSocketId) {
    logging_1.logger.info("connection opened on websocket " + webSocketId);
    webSocketService_1.webSocketService.addWebSocket(webSocketId, webSocket);
    var userId = webSocketService_1.webSocketService.getUserId(webSocketId);
    parcelService_1.parcelService.deliverContactListParcel(userId);
    parcelService_1.parcelService.deliverMessageHistoryParcel(userId);
    parcelService_1.parcelService.deliver(blueprints_1.connectedUserParcel(userId));
    parcelService_1.parcelService.broadcastContactListUpdateToUserContacts(userId);
};
var onMessage = function (data) {
    logging_1.logger.info('message received');
    var parcel = JSON.parse(data);
    parcelService_1.parcelService.receive(parcel);
};
var onClose = function (socketId) {
    logging_1.logger.info("connection closed on websocket " + socketId);
    webSocketService_1.webSocketService.removeWebSocket(socketId);
    parcelService_1.parcelService.broadcastContactListUpdateToUserContacts(webSocketService_1.webSocketService.getUserId(socketId));
};
var setupEventListeners = function (webSocket, req) {
    onOpen(webSocket, req.params.id);
    webSocket.on('message', onMessage);
    webSocket.on('close', function () { return onClose(req.params.id); });
};
exports.setupEventListeners = setupEventListeners;

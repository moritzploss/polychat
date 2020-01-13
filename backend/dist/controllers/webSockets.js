"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logging_1 = require("../logging");
var parcelService_1 = require("../services/parcelService");
var defaults_1 = require("../parcels/defaults");
var webSocketService_1 = require("../services/webSocketService");
var database_1 = require("../services/database");
var authenticateWebSocket = function (webSocket, req, next) { return ((req.params.id.startsWith(req.session.userId) && req.session.authorized)
    ? next()
    : webSocket.close()); };
exports.authenticateWebSocket = authenticateWebSocket;
var onOpen = function (webSocket, webSocketId) {
    webSocketService_1.webSocketService.addWebSocket(webSocketId, webSocket);
    logging_1.logger.info("connection opened on websocket " + webSocketId);
    var userId = webSocketService_1.webSocketService.getUserId(webSocketId);
    database_1.getUserMessages(userId, function (messages) { return parcelService_1.parcelService.deliver(defaults_1.setupParcel(userId, messages)); });
    parcelService_1.parcelService.broadCast(defaults_1.contactListParcel());
};
var onMessage = function (webSocket, data) {
    var parcel = JSON.parse(data);
    parcelService_1.parcelService.receive(parcel);
    logging_1.logger.info('message received');
};
var onClose = function (socketId) {
    webSocketService_1.webSocketService.removeWebSocket(socketId);
    logging_1.logger.info("connection closed on websocket " + socketId);
};
var setupEventListeners = function (webSocket, req) {
    onOpen(webSocket, req.params.id);
    webSocket.on('message', onMessage);
    webSocket.on('close', function () { return onClose(req.params.id); });
};
exports.setupEventListeners = setupEventListeners;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logging_1 = require("../logging");
var parcelService_1 = require("../services/parcelService");
var webSocketService_1 = require("../services/webSocketService");
var authenticateWebSocket = function (webSocket, req, next) { return ((req.params.id.startsWith(req.session.userId) && req.session.authorized)
    ? next()
    : webSocket.close()); };
exports.authenticateWebSocket = authenticateWebSocket;
var onOpen = function (webSocket, socketId) {
    webSocketService_1.webSocketService.addWebSocket(socketId, webSocket);
    logging_1.logger.info("connection opened on websocket " + socketId);
    webSocket.send('welcome');
};
var onMessage = function (webSocket, data) {
    parcelService_1.parcelService.receive(data);
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

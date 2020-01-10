"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logging_1 = require("../logging");
var webSockets_1 = require("../services/webSockets");
var authenticateWebSocket = function (webSocket, req, next) {
    return (req.params.id.startsWith(req.session.userId) && req.session.authorized)
        ? next()
        : webSocket.close();
};
exports.authenticateWebSocket = authenticateWebSocket;
var onOpen = function (webSocket, req, socketId) {
    webSockets_1.webSocketService.addWebSocket(socketId, webSocket);
    logging_1.logger.info("connection opened on socket " + socketId);
    return webSocket.send('welcome');
};
var onMessage = function (webSocket, data) {
    return logging_1.logger.info('message received');
};
var onClose = function (webSocket, req) {
    webSockets_1.webSocketService.removeWebSocket(req.params.id);
    return logging_1.logger.info("connection closed " + req.params.id);
};
var setupEventListeners = function (webSocket, req) {
    onOpen(webSocket, req, req.params.id);
    webSocket.on('message', onMessage);
    webSocket.on('close', function () { return onClose(webSocket, req); });
};
exports.setupEventListeners = setupEventListeners;

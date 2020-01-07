"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logging_1 = require("../logging");
exports.onOpen = function (webSocket, req, socketId) {
    logging_1.logger.info('connection opened');
    return webSocket.send('welcome');
};
exports.onMessage = function (webSocket, data) {
    return logging_1.logger.info('message received');
};
exports.onClose = function (webSocket, code) {
    return logging_1.logger.info('connection closed');
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wsController = require("../controllers/sockets");
var express = require("express");
var expressWs = require("express-ws");
expressWs(express());
var socketsRouter = express.Router();
socketsRouter.ws('/clients/:id', function (webSocket, req) {
    wsController.onOpen(webSocket, req, req.params.id);
    webSocket.on('message', wsController.onMessage);
    webSocket.on('close', wsController.onClose);
});
exports.default = socketsRouter;

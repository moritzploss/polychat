"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wsController = require("../controllers/webSockets");
var express = require("express");
var expressWs = require("express-ws");
expressWs(express());
var webSocketsRouter = express.Router();
exports.webSocketsRouter = webSocketsRouter;
webSocketsRouter.ws('/clients/:id', wsController.authenticateWebSocket, wsController.setupEventListeners);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wsController = require("../controllers/webSockets");
var express = require("express");
var expressWs = require("express-ws");
expressWs(express());
var socketsRouter = express.Router();
exports.socketsRouter = socketsRouter;
socketsRouter.ws('/clients/:id', wsController.authenticateWebSocket, wsController.setupEventListeners);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webSockets_1 = require("./routes/webSockets");
var api_1 = require("./routes/api");
var logging_1 = require("./logging");
var database_1 = require("./services/database");
var expressSession_1 = require("./sessions/expressSession");
var bodyParser = require("body-parser");
var express = require("express");
var helmet = require("helmet");
var morgan = require("morgan");
var expressWs = require("express-ws");
var app = expressWs(express()).app;
app.use(helmet());
app.use(bodyParser.json());
app.use(expressSession_1.sessionConfig);
app.use(morgan('tiny', { stream: logging_1.loggStream }));
database_1.connectDatabase().then(function () { return database_1.addTestUser(); });
app.use('/api/websockets', webSockets_1.socketsRouter);
app.use('/api', api_1.apiRouter);
exports.default = app;

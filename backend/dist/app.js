"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sockets_1 = require("./routes/sockets");
var logging_1 = require("./logging");
var bodyParser = require("body-parser");
var express = require("express");
var helmet = require("helmet");
var morgan = require("morgan");
var expressWs = require("express-ws");
var app = expressWs(express()).app;
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('tiny', { stream: logging_1.loggStream }));
app.use('/api/sockets', sockets_1.default);
app.get('/api/login', function (req, res) { return res.send('hi'); });
exports.default = app;

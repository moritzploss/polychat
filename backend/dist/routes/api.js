"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authentication_1 = require("../controllers/authentication");
var express = require("express");
var apiRouter = express.Router();
exports.apiRouter = apiRouter;
apiRouter.post('/login', authentication_1.authenticateRequest);

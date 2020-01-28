"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var login_1 = require("../controllers/login");
var session_1 = require("../controllers/session");
var authorization_1 = require("../controllers/authorization");
var apiRouter = express.Router();
exports.apiRouter = apiRouter;
apiRouter.post('/login', login_1.loginUser);
apiRouter.get('/sessions', session_1.validateSession); // should be /sessions/:userId
apiRouter.delete('/sessions/:userId', authorization_1.authorizeOrReject, session_1.deleteSession);

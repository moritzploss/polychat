"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authentication_1 = require("../controllers/authentication");
var messages_1 = require("../controllers/messages");
var session_1 = require("../controllers/session");
var users_1 = require("../controllers/users");
var express = require("express");
var apiRouter = express.Router();
exports.apiRouter = apiRouter;
apiRouter.post('/login', authentication_1.authenticateRequest);
apiRouter.get('/validate-session', session_1.validateSession);
apiRouter.get('/destroy-session', session_1.destroySession);
apiRouter.put('/direct-message', messages_1.setReadStatus);
apiRouter.post('/contactlist', users_1.addContact);
apiRouter.delete('/contactlist', users_1.removeContact);
apiRouter.get('/users', users_1.getUsers);
apiRouter.get('/users/:id', users_1.getUser);
apiRouter.put('/users/:id', users_1.updateUser);

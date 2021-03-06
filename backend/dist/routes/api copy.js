"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_1 = require("../controllers/login");
var messages_1 = require("../controllers/messages");
var session_1 = require("../controllers/session");
var users_1 = require("../controllers/users");
var express = require("express");
var apiRouter = express.Router();
exports.apiRouter = apiRouter;
apiRouter.post('/login', login_1.loginUser);
apiRouter.get('/sessions', session_1.validateSession); // should be /sessions/:userId
apiRouter.delete('/sessions/:userId', session_1.destroySession);
apiRouter.put('/users/:userId/messages/:contactId/:messageId', messages_1.setReadStatus);
apiRouter.post('/users/:userId/contacts', users_1.addContact);
apiRouter.delete('/users/:userId/contacts/:contactId', users_1.removeContact);
apiRouter.get('/users', users_1.getUsers);
apiRouter.get('/users/:userId', users_1.getUser);
apiRouter.put('/users/:userId', users_1.updateUser);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authentication_1 = require("../controllers/authentication");
var index_1 = require("../logging/index");
var express = require("express");
var apiRouter = express.Router();
exports.apiRouter = apiRouter;
apiRouter.post('/login', authentication_1.authenticateRequest);
apiRouter.get('/validate-session', function (req, res) {
    var status = req.session.authorized ? 200 : 401;
    return res.status(status).send();
});
apiRouter.get('/destroy-session', function (req, res) {
    req.session.destroy(index_1.logger.error);
    return res.send();
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../logging/index");
var validateSession = function (req, res) {
    var status = req.session.authorized ? 200 : 401;
    res.status(status).send();
};
exports.validateSession = validateSession;
var deleteSession = function (req, res) { return (req.session.destroy(function (error) {
    if (error) {
        index_1.logger.error(error);
        res.status(500);
    }
    res.send();
})); };
exports.deleteSession = deleteSession;

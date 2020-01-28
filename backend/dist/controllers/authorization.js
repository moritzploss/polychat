"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authorizeOrReject = function (req, res, next) { return ((req.session.authorized && (req.session.userId === req.params.userId))
    ? next()
    : res.status(401).json({ error: 'unauthorized' })); };
exports.authorizeOrReject = authorizeOrReject;

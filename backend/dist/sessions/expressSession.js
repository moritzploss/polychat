"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var session = require("express-session");
var uuid = require("uuid/v4");
var sessionConfig = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    genid: function () { return uuid(); },
    cookie: {
        maxAge: 60000,
    },
});
exports.sessionConfig = sessionConfig;

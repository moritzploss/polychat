"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocketService = /** @class */ (function () {
    function WebSocketService() {
        var _this = this;
        this.addClient = function (webSocketId, userId) {
            _this.webSockets[userId] = _this.webSockets[userId]
                ? __spreadArrays(_this.webSockets[userId], [webSocketId]) : [webSocketId];
        };
        this.removeClient = function (clientId, userId) {
            _this.webSockets[userId] = _this.webSockets[userId].filter(function (id) { return id !== clientId; });
        };
        this.removeUser = function (userId) { return delete _this.webSockets[userId]; };
        this.hasWebSockets = function (userId) { return (Boolean(_this.getWebSocketsByUserId(userId).length)); };
        this.getWebSocketsByUserId = function (userId) { return (_this.webSockets[userId]
            ? _this.webSockets[userId]
            : []); };
        this.webSockets = {};
    }
    return WebSocketService;
}());
exports.WebSocketService = WebSocketService;
exports.clients = new WebSocketService();

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
        this.addWebSocket = function (webSocketId, webSocket) {
            var userId = _this.getUserId(webSocketId);
            var webSocketData = { webSocket: webSocket, webSocketId: webSocketId };
            _this.webSockets[userId] = _this.webSockets[userId]
                ? __spreadArrays(_this.webSockets[userId], [webSocketData]) : [webSocketData];
        };
        this.hasWebSockets = function (userId) { return (Boolean(_this.getWebSocketsByUserId(userId).length)); };
        this.getWebSocketsByUserId = function (userId) { return (_this.webSockets[userId]
            ? _this.webSockets[userId]
            : []); };
        this.getUserId = function (webSocketId) { return webSocketId.split('--')[0]; };
        this.removeWebSocket = function (webSocketId) {
            var userId = _this.getUserId(webSocketId);
            _this.webSockets[userId] = _this.webSockets[userId].filter(function (_a) {
                var id = _a.webSocketId;
                return id !== webSocketId;
            });
            if (_this.webSockets[userId].length === 0) {
                _this.removeUser(userId);
            }
        };
        this.removeUser = function (userId) { return delete _this.webSockets[userId]; };
        this.webSockets = {};
    }
    return WebSocketService;
}());
exports.WebSocketService = WebSocketService;
var webSocketService = new WebSocketService();
exports.webSocketService = webSocketService;

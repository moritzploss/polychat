"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var logging_1 = require("../logging");
var webSocketService_1 = require("./webSocketService");
var logUnknownParcel = function (parcel) {
    logging_1.logger.info({
        message: "received parcel of unknown type " + parcel.type,
        parcel: parcel,
    });
};
var createParcel = function (type, receiverId, senderId, kwargs) {
    if (receiverId === void 0) { receiverId = 'all'; }
    if (senderId === void 0) { senderId = 'system'; }
    if (kwargs === void 0) { kwargs = {}; }
    return (__assign({ timeStamp: new Date().toLocaleString(), type: type,
        receiverId: receiverId,
        senderId: senderId }, kwargs));
};
exports.createParcel = createParcel;
var ParcelService = /** @class */ (function () {
    function ParcelService(wsService) {
        var _this = this;
        this.broadCast = function (parcel) {
            _this.webSocketService
                .getAllWebSockets()
                .forEach(function (_a) {
                var webSocket = _a.webSocket;
                return webSocket.send(JSON.stringify(parcel));
            });
        };
        this.deliver = function (parcel) {
            _this.webSocketService
                .getWebSocketsByUserId(parcel.receiverId)
                .map(function (_a) {
                var webSocket = _a.webSocket;
                return webSocket;
            })
                .forEach(function (webSocket) { return webSocket.send(JSON.stringify(parcel)); });
        };
        this.deliverSetupParcel = function (userId, messages) {
            var parcel = createParcel('SETUP CLIENT', userId, '', { messages: messages });
            _this.deliver(parcel);
        };
        this.receive = function (parcel) {
            switch (parcel.type) {
                case 'DIRECT MESSAGE':
                    return _this.deliver(parcel);
                default:
                    return logUnknownParcel(parcel);
            }
        };
        this.webSocketService = wsService;
    }
    return ParcelService;
}());
exports.ParcelService = ParcelService;
var parcelService = new ParcelService(webSocketService_1.webSocketService);
exports.parcelService = parcelService;

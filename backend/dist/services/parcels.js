"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webSockets_1 = require("./webSockets");
var logging_1 = require("../logging");
var logUnknownParcel = function (parcel) {
    logging_1.logger.info({
        message: "received parcel of unknown type " + parcel.type,
        parcel: parcel,
    });
};
var ParcelService = /** @class */ (function () {
    function ParcelService(wsService) {
        var _this = this;
        this.deliver = function (parcel) {
            _this.webSocketService
                .getWebSocketsByUserId(parcel.receiverId)
                .map(function (_a) {
                var webSocket = _a.webSocket;
                return webSocket;
            })
                .forEach(function (webSocket) { return webSocket.send(parcel); });
        };
        this.receive = function (parcel, onUnknownParcel) {
            if (onUnknownParcel === void 0) { onUnknownParcel = logUnknownParcel; }
            switch (parcel.type) {
                case 'DIRECT MESSAGE':
                    return _this.deliver(parcel);
                default:
                    return onUnknownParcel(parcel);
            }
        };
        this.webSocketService = wsService;
    }
    return ParcelService;
}());
exports.ParcelService = ParcelService;
var parcelService = new ParcelService(webSockets_1.webSocketService);
exports.parcelService = parcelService;

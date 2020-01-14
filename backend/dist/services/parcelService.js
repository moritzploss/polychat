"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logging_1 = require("../logging");
var webSocketService_1 = require("./webSocketService");
var repository_1 = require("./repository");
var login_1 = require("../controllers/login");
var blueprints_1 = require("../parcels/blueprints");
var logUnknownParcel = function (parcel) {
    logging_1.logger.info({
        message: "received parcel of unknown type " + parcel.type,
        parcel: parcel,
    });
};
var ParcelService = /** @class */ (function () {
    function ParcelService(wsService, repositoryService) {
        var _this = this;
        this.deliverMessageHistoryParcel = function (userId) {
            _this.repository.getUserMessages(userId, function (messages) { return (_this.deliver(blueprints_1.messageHistoryParcel(userId, messages))); });
        };
        this.deliverContactListParcel = function (userId) { return _this.repository.getUserContacts(userId, function (contacts) { return _this.repository.getUsersById(contacts, function (users) { return _this.deliver(blueprints_1.contactListParcel(userId, users.map(login_1.toCredentials))); }); }); };
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
        this.receive = function (parcel) {
            switch (parcel.type) {
                case 'DIRECT MESSAGE':
                    return _this.deliver(parcel);
                default:
                    return logUnknownParcel(parcel);
            }
        };
        this.webSocketService = wsService;
        this.repository = repositoryService;
    }
    return ParcelService;
}());
exports.ParcelService = ParcelService;
var parcelService = new ParcelService(webSocketService_1.webSocketService, repository_1.repository);
exports.parcelService = parcelService;

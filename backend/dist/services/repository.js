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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var logging_1 = require("../logging");
var user_1 = require("../schemas/user");
var testUsers_1 = require("../util/testUsers");
var updateDirectMessages = function (messages, parcel, senderId) {
    var _a;
    if (senderId === void 0) { senderId = parcel.senderId; }
    var newMessages = messages[senderId]
        ? __spreadArrays(messages[senderId], [parcel]) : [parcel];
    return __assign(__assign({}, messages), (_a = {}, _a[senderId] = newMessages, _a));
};
var Repository = /** @class */ (function () {
    function Repository(user) {
        var _this = this;
        this.connectDatabase = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                });
                mongoose.connection.on('error', logging_1.logger.error);
                mongoose.connection.once('open', function () {
                    logging_1.logger.info('connected to mongo db');
                    _this.addTestUser();
                });
                return [2 /*return*/, mongoose.connection];
            });
        }); };
        this.addTestUser = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                testUsers_1.testUsers.forEach(function (user) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, user.save(function (error) {
                                    if (error)
                                        return;
                                    _this.addUserToContactList(user.id, user.id, logging_1.logger.error);
                                })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
        this.saveParcelToUserMessages = function (parcel, senderId, receiverId) {
            _this.user.findById(senderId, function (error, user) {
                if (error)
                    return logging_1.logger.error(error);
                _this.user.updateOne({ _id: senderId }, { $set: { messages: updateDirectMessages(user.messages, parcel, receiverId) } }, logging_1.logger.error);
                return logging_1.logger.info({
                    message: 'saved DirectMessageParcel to message database',
                    parcel: parcel,
                });
            });
        };
        this.saveDirectMessage = function (parcel) {
            _this.saveParcelToUserMessages(parcel, parcel.senderId, parcel.receiverId);
            _this.saveParcelToUserMessages(parcel, parcel.receiverId, parcel.senderId);
        };
        this.updateUser = function (callback, userId, fields) {
            _this.user.findById(userId, function (error, user) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, ((error)
                            ? logging_1.logger.error(error)
                            : this.user.updateOne({ _id: userId }, { $set: fields }, function (err) { return callback(err, user); }))];
                });
            }); });
        };
        this.markMessageAsRead = function (senderId, receiverId, messageId) { return __awaiter(_this, void 0, void 0, function () {
            var targetMessage, targetField;
            var _a, _b;
            return __generator(this, function (_c) {
                targetMessage = "messages." + receiverId + ".id";
                targetField = "messages." + receiverId + ".$.read";
                return [2 /*return*/, this.user.findOneAndUpdate((_a = { _id: senderId }, _a[targetMessage] = messageId, _a), { $set: (_b = {}, _b[targetField] = true, _b) })];
            });
        }); };
        this.addUserToContactList = function (userId, userToAdd, callback) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.user.findById(userId, function (error, user) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (error)
                                    return [2 /*return*/, logging_1.logger.error(error)];
                                if (!!user.contacts.includes(userToAdd)) return [3 /*break*/, 3];
                                return [4 /*yield*/, this.user.updateOne({ _id: userId }, { $set: { contacts: __spreadArrays(user.contacts, [userToAdd]) } }, logging_1.logger.error)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, this.user.updateOne({ _id: userToAdd }, { $set: { inContactListOf: __spreadArrays(user.inContactListOf, [userId]) } }, logging_1.logger.error)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3: return [2 /*return*/, callback()];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
        this.removeUserFromContactList = function (userId, userToRemove, callback) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.user.findById(userId, function (error, user) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (error)
                                    return [2 /*return*/, logging_1.logger.error(error)];
                                return [4 /*yield*/, this.user.updateOne({ _id: userId }, { $set: { contacts: user.contacts.filter(function (contact) { return contact !== userToRemove; }) } }, logging_1.logger.error)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, this.user.updateOne({ _id: userToRemove }, { $set: { inContactListOf: user.inContactListOf.filter(function (contact) { return contact !== userId; }) } }, logging_1.logger.error)];
                            case 2:
                                _a.sent();
                                return [2 /*return*/, callback()];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
        this.findUserById = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.user.findById(id)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        }); };
        this.findUsersBy = function (query) { return __awaiter(_this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.user.find(query)];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users || []];
                }
            });
        }); };
        this.getUserFieldData = function (userId, field) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.user.findById(userId)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data[field]];
                }
            });
        }); };
        this.getUserMessages = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (this.getUserFieldData(userId, 'messages'))];
            });
        }); };
        this.getUserContacts = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (this.getUserFieldData(userId, 'contacts'))];
            });
        }); };
        this.getUserLanguage = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (this.getUserFieldData(userId, 'language'))];
            });
        }); };
        this.getUsersById = function (userIds) { return __awaiter(_this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.user.find({
                            _id: { $in: userIds.map(function (id) { return mongoose.Types.ObjectId(id); }) },
                        })];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                }
            });
        }); };
        this.user = user;
    }
    return Repository;
}());
exports.Repository = Repository;
var repository = new Repository(user_1.User);
exports.repository = repository;

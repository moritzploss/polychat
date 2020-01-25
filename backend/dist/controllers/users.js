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
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var repository_1 = require("../services/repository");
var parcelService_1 = require("../services/parcelService");
var login_1 = require("./login");
var logging_1 = require("../logging");
var mongo_1 = require("../util/mongo");
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, repository_1.repository.findUserById(req.params.id)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.json(login_1.toCredentials(user))];
        }
    });
}); };
exports.getUser = getUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mongoQuery, users, userData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mongoQuery = mongo_1.queryParamsToMongoRegexQuery(req.query);
                return [4 /*yield*/, repository_1.repository.findUsersBy(mongoQuery)];
            case 1:
                users = _a.sent();
                userData = R.isEmpty(users)
                    ? []
                    : users.map(login_1.toCredentials);
                return [2 /*return*/, res.json(userData)];
        }
    });
}); };
exports.getUsers = getUsers;
var addContact = function (req, res) {
    var _a = req.body, userId = _a.userId, userToAdd = _a.userToAdd;
    repository_1.repository.addUserToContactList(userId, userToAdd, function () {
        parcelService_1.parcelService.deliverContactListParcel(userId);
        res.json({});
    });
};
exports.addContact = addContact;
var removeContact = function (req, res) {
    var _a = req.body, userId = _a.userId, userToRemove = _a.userToRemove;
    repository_1.repository.removeUserFromContactList(userId, userToRemove, function () {
        parcelService_1.parcelService.deliverContactListParcel(userId);
        res.json({});
    });
};
exports.removeContact = removeContact;
var updateUser = function (req, res) {
    if (R.isEmpty(login_1.toCredentials(req.body))) {
        return res.status(400).json({ error: 'no valid fields found' });
    }
    var callback = function (error, user) {
        if (error) {
            logging_1.logger.error(error);
            return res.status(500).json({ error: 'an error occured' });
        }
        parcelService_1.parcelService.broadcastContactListUpdateToUserContacts(req.params.id);
        return res.json(login_1.toCredentials(__assign(__assign({}, login_1.toCredentials(user)), req.body)));
    };
    return repository_1.repository.updateUser(callback, req.params.id, req.body);
};
exports.updateUser = updateUser;

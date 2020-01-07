"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
var ts_mongoose_1 = require("ts-mongoose");
var schema = ts_mongoose_1.createSchema({
    email: ts_mongoose_1.Type.string({
        unique: true,
        required: true,
        trim: true,
    }),
    password: ts_mongoose_1.Type.string({
        required: true,
    }),
    name: ts_mongoose_1.Type.string({
        required: true,
    }),
    language: ts_mongoose_1.Type.string({
        required: true,
    }),
    createdAt: ts_mongoose_1.Type.date({
        required: true,
        default: Date.now,
    }),
    messages: ts_mongoose_1.Type.object({
        required: true,
        default: Object,
    }),
});
schema.pre('save', function (next) {
    bcrypt.hash(_this.password, 10, function (error, hash) {
        if (error)
            return next(error);
        _this.password = hash;
        return next();
    });
});
schema.statics.authenticate = function (email, password, callback) { return _this
    .findOne({ email: email })
    .exec(function (error, user) {
    if (error)
        return callback(error);
    if (!user)
        return callback(401);
    return bcrypt.compare(password, user.password, function (_, result) { return ((result === true)
        ? callback(null, user)
        : callback()); });
}); };
var user = ts_mongoose_1.typedModel('user', schema);
exports.user = user;

"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable dot-notation */
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
});
// eslint-disable-next-line func-names
schema.pre('save', function (next) {
    var _this = this;
    bcrypt.hash(this['password'], 10, function (error, hash) {
        if (error)
            return next(error);
        _this['password'] = hash;
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
var User = ts_mongoose_1.typedModel('user', schema);
exports.User = User;

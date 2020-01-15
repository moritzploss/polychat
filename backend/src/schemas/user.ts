/* eslint-disable dot-notation */
import * as bcrypt from 'bcrypt';
import { HookNextFunction } from 'mongoose';
import { createSchema, Type, typedModel } from 'ts-mongoose';

import { UserDocument } from '../types/backend';

const schema = createSchema({
  email: Type.string({
    unique: true,
    required: true,
    trim: true,
  }),
  password: Type.string({
    required: true,
  }),
  name: Type.string({
    required: true,
  }),
  language: Type.string({
    required: true,
  }),
  avatar: Type.string({
    required: true,
    default: `avatar-${Math.floor(Math.random() * 6)}.svg`,
  }),
  contacts: Type.array().of(Type.string()),
  inContactListOf: Type.array().of(Type.string()),
  createdAt: Type.date({
    required: true,
    default: Date.now,
  }),
  messages: Type.object().of({}),
});

// eslint-disable-next-line func-names
schema.pre('save', function (next: HookNextFunction) {
  bcrypt.hash(this['password'], 10, (error: Error, hash: string) => {
    if (error) return next(error);
    this['password'] = hash;
    return next();
  });
});

// eslint-disable-next-line func-names
schema.statics.authenticate = function (email: string, password: string, callback: Function): Promise<string | Error> {
  return this
    .findOne({ email })
    .exec((error: Error, user: UserDocument) => {
      if (error) return callback(error);
      if (!user) return callback(401);

      return bcrypt.compare(password, user.password, (_, result) => (
        (result === true)
          ? callback(null, user)
          : callback()
      ));
    });
};

const User = typedModel('user', schema);

export type UserMongoose = typeof User;

export { User };

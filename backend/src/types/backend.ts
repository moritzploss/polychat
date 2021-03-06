import { MongooseDocument } from 'mongoose';
import * as ws from 'ws';
import { Response } from 'express-serve-static-core';

import { Messages } from './applicationWide';

export type JsonOrNext = Response<JSON> | void;

interface MongoRegex {
  $regex: RegExp;
  $options: string;
}

export type MongoRegexQuery = Record<string, MongoRegex>;

export type UserDocument = MongooseDocument & {
  password: string;
  email: string;
};

export interface Logger {
  error: Function;
  info: Function;
}

export interface MongooseUser {
  _id: string;
  email: string;
  password: string;
  name: string;
  language: string;
  avatar: string;
  contacts: string[];
  inContactListOf: string[];
  createdAt: Date;
  messages: Messages;
}

export interface SafelyError {
  error: {
    message: string;
  };
}

export interface UserData {
  email: string;
  password: string;
  name: string;
  language: string;
  createdAt: string;
  messages: object;
  id: string;
}

export interface WebSocketData {
  webSocket: ws;
  webSocketId: string;
}

export interface UpdatableUserData {
  name?: string;
  language?: string;
  avatar?: string;
}

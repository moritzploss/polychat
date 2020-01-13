import { MongooseDocument } from 'mongoose';
import * as ws from 'ws';

export interface Parcel {
  type: string;
  senderId: string;
  receiverId?: string;
  body?: Record<string, any>;
  timeStamp: string;
}

export interface UserCredentials {
  name: string;
  language: string;
  email: string;
  id: string;
}

export type UserDocument = MongooseDocument & {
  password: string;
  email: string;
};

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

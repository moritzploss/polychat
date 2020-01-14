import { MongooseDocument } from 'mongoose';
import * as ws from 'ws';

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
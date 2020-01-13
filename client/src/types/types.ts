import { ParcelService } from '../services/parcelService';

export interface Action {
  type: string;
}

export interface Client {
  parcelService: ParcelService | any;
  messages: Record<string, any>;
  connectedUsers: string[];
}

export interface Parcel {
  type: string;
  senderId: string;
  receiverId: string;
  body: {
    messages?: Parcel[];
    connectedUsers: string[];
  };
}

export interface ReduxStoreContents {
  client: Record<string, any>;
  session: {
    user: Record<string, any>;
  };
}

export type UserData = Record<string, any>;

export type LoginResponseData = Record<string, any>;

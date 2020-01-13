import { Parcel, UserCredentials } from './applicationWide';

export interface Action {
  type: string;
}

export interface AppState {
  currentState: string;
}

export interface Client {
  connectedUsers: string[];
  contactList: UserCredentials[];
  chatPartner: string;
}

export interface ReduxStoreContents {
  appState: Record<string, any>;
  client?: Record<string, any>;
  session?: {
    user: Record<string, any>;
  };
  messages?: Record<string, Parcel[]>;
  parcelService?: any;
}



export type UserData = Record<string, any>;

export type LoginResponseData = Record<string, any>;

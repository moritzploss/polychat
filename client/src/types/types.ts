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

export interface DirectMessage {
  type: string;
  senderId: string;
  receiverId: string;
  body: {
    message: string;
  };
}

export interface Parcel {
  type: string;
  senderId: string;
  receiverId: string;
  timeStamp: string;
  body: {
    message?: string;
    messages?: Parcel[];
    connectedUsers?: string[];
    contactList?: string[];
  };
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


export interface UserCredentials {
  name: string;
  language: string;
  email: string;
  id: string;
}

export type UserData = Record<string, any>;

export type LoginResponseData = Record<string, any>;

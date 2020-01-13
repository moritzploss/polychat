export interface Action {
  type: string;
}

export interface Client {
  connectedUsers: string[];
  contactList: string[];
}

export interface Parcel {
  type: string;
  senderId: string;
  receiverId: string;
  body: {
    messages?: Parcel[];
    connectedUsers?: string[];
    contactList?: string[];
  };
}

export interface ReduxStoreContents {
  client?: Record<string, any>;
  session?: {
    user: Record<string, any>;
  };
  messages?: Record<string, Parcel[]>;
  parcelService?: any;
}

export type UserData = Record<string, any>;

export type LoginResponseData = Record<string, any>;

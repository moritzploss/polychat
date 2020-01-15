export interface Parcel {
  type: string;
  senderId: string;
  receiverId?: string;
  timeStamp: string;
}

export interface DirectMessageParcel extends Parcel {
  message: string;
}

export interface MessageHistoryParcel extends Parcel {
  messages: Record<string, DirectMessageParcel[]>;
}

export interface ConnectedUsersParcel extends Parcel {
  connectedUsers: string[];
}

export interface ContactListParcel extends ConnectedUsersParcel {
  contactList: UserData[];
}

export type Messages = Record<string, DirectMessageParcel[]>;

export interface UserData {
  name: string;
  language: string;
  email: string;
  id: string;
}
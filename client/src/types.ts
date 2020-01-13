export interface Parcel {
  type: string;
  senderId: string;
  receiverId: string;
  body: {
    messages?: Parcel[];
    connectedUsers: string[];
  };
}

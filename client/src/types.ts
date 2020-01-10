export interface Parcel {
  type: string;
  senderId: string;
  receiverId: string;
  body?: Record<string, any>;
}

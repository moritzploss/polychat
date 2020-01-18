import { DirectMessageParcel, MessageHistoryParcel, Messages } from '../types/applicationWide';

const messageActions = {
  addDirectMessage: (parcel: DirectMessageParcel): { type: string; parcel: DirectMessageParcel } => ({
    type: 'ADD DIRECTMESSAGE',
    parcel,
  }),

  addOwnDirectMessage: (parcel: DirectMessageParcel): { type: string; parcel: DirectMessageParcel } => ({
    type: 'ADD OWN DIRECTMESSAGE',
    parcel,
  }),

  replaceMessageHistory: (parcel: MessageHistoryParcel): { type: string; messages: Messages | [] } => ({
    type: 'REPLACE MESSAGE HISTORY',
    messages: parcel.messages ? parcel.messages : [],
  }),

  readAllMessages: (userId: string): { type: string; userId: string } => ({
    type: 'READ ALL MESSAGES',
    userId,
  }),
};

export { messageActions };

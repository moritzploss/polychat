/* eslint-disable no-case-declarations */
import { Parcel, DirectMessageParcel } from '../types/applicationWide';
import { addDirectMessage } from '../services/messageService';

const initialState: Record<string, DirectMessageParcel[]> = {};

const messageReducer = (messages = initialState, action: any): Record<string, Parcel[]> => {
  switch (action.type) {
    case 'ADD DIRECTMESSAGE':
      return addDirectMessage(messages, action.parcel);
    case 'ADD OWN DIRECTMESSAGE':
      return addDirectMessage(messages, action.parcel, action.parcel.receiverId);
    case 'REPLACE MESSAGE HISTORY':
      return action.messages;
    case 'READ ALL MESSAGES':
      const userMessages = (messages[action.userId] || [])
        .map((parcel: DirectMessageParcel) => ({
          ...parcel,
          read: true,
        }));
      return {
        ...messages,
        [action.userId]: userMessages,
      };
    default:
      return messages;
  }
};

export { messageReducer };

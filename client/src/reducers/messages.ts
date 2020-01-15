import { Parcel } from '../types/applicationWide';
import { addDirectMessage } from '../services/messageService';

const initialState = {};

const messageReducer = (messages = initialState, action: any): Record<string, Parcel[]> => {
  switch (action.type) {
    case 'ADD DIRECTMESSAGE':
      return addDirectMessage(messages, action.parcel);
    case 'ADD OWN DIRECTMESSAGE':
      return addDirectMessage(messages, action.parcel, action.parcel.receiverId);
    case 'REPLACE MESSAGE HISTORY':
      return action.messages;
    default:
      return messages;
  }
};

export { messageReducer };
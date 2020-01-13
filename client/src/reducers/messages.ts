import { Parcel } from '../types/types';
import { addDirectMessage } from '../services/messageService';

const initialState = {};

const messageReducer = (messages = initialState, action: any): Record<string, Parcel[]> => {
  switch (action.type) {
    case 'ADD DIRECTMESSAGE':
      return addDirectMessage(messages, action.parcel);
    default:
      return initialState;
  }
};

export { messageReducer };

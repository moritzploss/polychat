import { Client } from '../types/types';
import { addDirectMessage } from '../services/messageService';

const initialState = {
  parcelService: {
    close: (): void => { },
  },
  messages: {
  },
  connectedUsers: [],
};

const clientReducer = (client = initialState, action: any): Client => {
  switch (action.type) {
    case 'ADD PARCELSERVICE':
      return {
        ...client,
        parcelService: action.parcelService,
      };
    case 'REMOVE PARCELSERVICE':
      client.parcelService.close();
      return {
        ...client,
        parcelService: initialState.parcelService,
      };
    case 'INITIATE MESSAGESTORE':
      return {
        ...client,
        messages: {},
      };
    case 'UPDATE CONNECTED USERS':
      return {
        ...client,
        connectedUsers: action.connectedUsers,
      };
    case 'ADD DIRECTMESSAGE':
      return {
        ...client,
        messages: addDirectMessage(client.messages, action.parcel),
      };
    default:
      return client;
  }
};

export { clientReducer };

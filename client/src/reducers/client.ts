import { Client } from '../types/types';

const initialState = {
  connectedUsers: [],
  contactList: [],
  chatPartner: '',
};

const clientReducer = (client = initialState, action: any): Client => {
  switch (action.type) {
    case 'UPDATE CONNECTED USERS':
      return {
        ...client,
        connectedUsers: action.connectedUsers,
      };
    case 'UPDATE CONTACTLIST':
      return {
        ...client,
        contactList: action.contactList,
      };
    case 'SET CHATPARTNER':
      return {
        ...client,
        chatPartner: action.chatPartner,
      };
    default:
      return client;
  }
};

export { clientReducer };

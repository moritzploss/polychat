import { Client } from '../types/client';

const chatPartner = {
  id: '',
  name: '',
  email: '',
  language: '',
  avatar: '',
};

const initialState = {
  connectedUsers: [],
  contactList: [],
  chatPartner,
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
        connectedUsers: action.connectedUsers,
      };
    case 'SET CHATPARTNER':
      return {
        ...client,
        chatPartner: action.chatPartner,
      };
    case 'RESET CHATPARTNER':
      return {
        ...client,
        chatPartner,
      };
    default:
      return client;
  }
};

export { clientReducer };

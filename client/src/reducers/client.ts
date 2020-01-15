import { Client } from '../types/client';

const initialState = {
  connectedUsers: [],
  contactList: [],
  chatPartner: {
    id: '',
    name: '',
    email: '',
    language: '',
    avatar: '',
  },
};

const clientReducer = (client = initialState, action: any): Client => {
  switch (action.type) {
    case 'UPDATE CONNECTED USERS':
      return {
        ...client,
        connectedUsers: action.connectedUsers,
      };
    case 'UPDATE CONTACTLIST':
      console.log('receiving update', action.contactList);
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

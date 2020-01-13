import { Parcel } from '../types/types';

const clientActions = {
  addDirectMessage: (parcel: Parcel): { type: string; parcel: Parcel } => ({
    type: 'ADD DIRECTMESSAGE',
    parcel,
  }),

  updateConnectedUsers: (parcel: Parcel): { type: string; connectedUsers: string[] } => ({
    type: 'UPDATE CONNECTED USERS',
    connectedUsers: parcel.body.connectedUsers ? parcel.body.connectedUsers : [],
  }),

  updateContactList: (parcel: Parcel): { type: string; contactList: string[] } => ({
    type: 'UPDATE CONTACTLIST',
    contactList: parcel.body.contactList ? parcel.body.contactList : [],
  }),
};

export { clientActions };

import { ConnectedUsersParcel, ContactListParcel, UserCredentials } from '../types/applicationWide';

const clientActions = {
  updateConnectedUsers: (parcel: ConnectedUsersParcel): { type: string; connectedUsers: string[] } => ({
    type: 'UPDATE CONNECTED USERS',
    connectedUsers: parcel.connectedUsers ? parcel.connectedUsers : [],
  }),

  updateContactList: (parcel: ContactListParcel): { type: string; contactList: UserCredentials[] } => ({
    type: 'UPDATE CONTACTLIST',
    contactList: parcel.contactList ? parcel.contactList : [],
  }),

  setChatPartner: (chatPartner: string): { type: string; chatPartner: string } => ({
    type: 'SET CHATPARTNER',
    chatPartner,
  }),
};

export { clientActions };

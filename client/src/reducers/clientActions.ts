import { ConnectedUsersParcel, ContactListParcel, UserData } from '../types/applicationWide';

const clientActions = {
  updateConnectedUsers: (parcel: ConnectedUsersParcel): { type: string; connectedUsers: string[] } => ({
    type: 'UPDATE CONNECTED USERS',
    connectedUsers: parcel.connectedUsers ? parcel.connectedUsers : [],
  }),

  updateContactList: (parcel: ContactListParcel): { type: string; contactList: UserData[]; connectedUsers: string[] } => ({
    type: 'UPDATE CONTACTLIST',
    contactList: parcel.contactList ? parcel.contactList : [],
    connectedUsers: parcel.connectedUsers ? parcel.connectedUsers : [],
  }),

  setChatPartner: (chatPartner: UserData): { type: string; chatPartner: UserData } => ({
    type: 'SET CHATPARTNER',
    chatPartner,
  }),

  resetChatPartner: (): { type: string } => ({
    type: 'RESET CHATPARTNER',
  }),
};

export { clientActions };

import { createParcel } from '../services/parcelService';
import { webSocketService } from '../services/webSocketService';

import { UserCredentials } from '../types';

const messageHistoryParcel = (userId: string, messages: Record<string, any>) => createParcel({
  type: 'REPLACE MESSAGE HISTORY',
  receiverId: userId,
  body: {
    messages,
  },
});

const connectedUserParcel = (userId: string) => createParcel({
  type: 'UPDATE CONNECTED USERS',
  receiverId: userId,
  body: {
    connectedUsers: webSocketService.getConnectedUsers(),
  },
});

const contactListParcel = (userId: string, contactList: UserCredentials[]) => createParcel({
  type: 'UPDATE CONTACTLIST',
  receiverId: userId,
  body: {
    contactList,
    connected: webSocketService.getConnectedUsers(),
  },
});

export { messageHistoryParcel, contactListParcel, connectedUserParcel };

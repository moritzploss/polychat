import { createParcel } from '../services/parcelService';
import { webSocketService } from '../services/webSocketService';

const messageHistoryParcel = (userId: string, messages: Record<string, any>) => createParcel({
  type: 'UPDATE MESSAGES',
  receiverId: userId,
  body: {
    messages,
  },
});

const contactListParcel = (userId: string, contactList: string[]) => createParcel({
  type: 'UPDATE CONTACTLIST',
  receiverId: userId,
  body: {
    contactList,
    connected: webSocketService.getConnectedUsers(),
  },
});

export { messageHistoryParcel, contactListParcel };

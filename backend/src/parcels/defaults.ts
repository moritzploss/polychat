import { createParcel } from '../services/parcelService';
import { webSocketService } from '../services/webSocketService';

const messageHistoryParcel = (userId: string, messages: Record<string, any>) => createParcel({
  type: 'UPDATE MESSAGES',
  receiverId: userId,
  body: {
    messages,
  },
});

const contactListParcel = (userId: string, contacts: string[]) => createParcel({
  type: 'UPDATE CONTACTLIST',
  receiverId: userId,
  body: {
    contacts,
    connected: webSocketService.getConnectedUsers(),
  },
});

export { messageHistoryParcel, contactListParcel };

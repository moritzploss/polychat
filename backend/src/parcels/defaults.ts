import { createParcel } from '../services/parcelService';
import { webSocketService } from '../services/webSocketService';

const contactListParcel = () => createParcel({
  type: 'UPDATE CONNECTED USERS',
  senderId: 'system',
  body: {
    connectedUsers: webSocketService.getConnectedUsers(),
  },
});

const setupParcel = (userId: string, messages: Record<string, any>) => createParcel({
  type: 'SETUP CLIENT',
  receiverId: userId,
  body: {
    messages,
  },
});

export { contactListParcel, setupParcel };

import uuid from 'uuid/v4';

import { DirectMessageParcel, Parcel } from '../types/applicationWide';

const getParcel = (type: string, receiverId = 'all', senderId = 'system'): Parcel => ({
  timeStamp: new Date().toISOString(),
  type,
  receiverId,
  senderId,
});

const directMessageParcel = (senderId: string, receiverId: string, message: string): DirectMessageParcel => ({
  ...getParcel('DIRECT MESSAGE', receiverId, senderId),
  message,
  read: false,
  id: uuid(),
});

export { directMessageParcel };

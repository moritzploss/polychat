import { Parcel } from '../types/types';

const createParcel = ({ type = 'DIRECT MESSAGE', receiverId = 'all', senderId = '', body = {}, kwargs = {} }): Parcel => ({
  ...kwargs,
  timeStamp: new Date().toLocaleString(),
  type,
  receiverId,
  senderId,
  body,
});

export { createParcel };

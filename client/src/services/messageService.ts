import { Parcel } from '../types';

const addDirectMessage = (messages: Record<string, any>, parcel: Parcel): Record<string, any> => {
  const newMessages = messages[parcel.senderId]
    ? [...messages[parcel.senderId], parcel]
    : [parcel];
  return {
    ...messages,
    [parcel.senderId]: newMessages,
  };
};

export { addDirectMessage };

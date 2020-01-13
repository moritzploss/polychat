import { DirectMessageParcel, Messages } from '../types/applicationWide';

const addDirectMessage = (messages: Messages, parcel: DirectMessageParcel): Messages => {
  const newMessages = messages[parcel.senderId]
    ? [...messages[parcel.senderId], parcel]
    : [parcel];
  return {
    ...messages,
    [parcel.senderId]: newMessages,
  };
};

export { addDirectMessage };

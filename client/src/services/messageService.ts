import { DirectMessageParcel, Messages } from '../types/applicationWide';

const addDirectMessage = (messages: Messages, parcel: DirectMessageParcel, senderId = parcel.senderId): Messages => {
  const newMessages = messages[senderId]
    ? [...messages[senderId], parcel]
    : [parcel];
  return {
    ...messages,
    [senderId]: newMessages,
  };
};

export { addDirectMessage };

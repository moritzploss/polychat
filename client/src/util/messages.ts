import { DirectMessageParcel, Messages } from '../types/applicationWide';

const hasUnreadMessages = (messages: Messages, chatPartnerId: string, userId: string): boolean => Boolean(
  messages[chatPartnerId]
    ? messages[chatPartnerId]
      .filter((message: DirectMessageParcel) => message.senderId !== userId)
      .find((message: DirectMessageParcel) => !message.read)
    : false,
);

const getUnreadMessages = (messages: Messages, chatPartnerId: string, userId: string): DirectMessageParcel[] => (
  messages[chatPartnerId]
    ? messages[chatPartnerId]
      .filter((message: DirectMessageParcel) => message.senderId !== userId)
      .filter((message: DirectMessageParcel) => !message.read)
    : []
);

const updateMessageOnServer = async (message: DirectMessageParcel, body = {}): Promise<void> => {
  const options: RequestInit = {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify(body),
  };
  const { receiverId, senderId, id } = message;
  fetch(`api/users/${receiverId}/messages/${senderId}/${id}`, options);
};

export {
  hasUnreadMessages,
  getUnreadMessages,
  updateMessageOnServer,
};

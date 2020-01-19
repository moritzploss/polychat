import { DirectMessageParcel, Messages } from '../types/applicationWide';
import { requestWithJsonBody } from './requests';
import { errorCallback } from './errors';

const readAllMessagesOnServer = (successCallback: Function, chatPartnerId: string, userId: string): void => {
  requestWithJsonBody({
    errCallback: errorCallback,
    successCallback,
    url: '/api/direct-message',
    type: 'PUT',
    body: {
      senderId: chatPartnerId,
      receiverId: userId,
    },
  });
};

const hasUnreadMessages = (messages: Messages, chatPartnerId: string, userId: string): boolean => Boolean(
  messages[chatPartnerId]
    ? messages[chatPartnerId]
      .filter((message: DirectMessageParcel) => message.senderId !== userId)
      .find((message: DirectMessageParcel) => !message.read)
    : false,
);

export {
  hasUnreadMessages,
  readAllMessagesOnServer,
};

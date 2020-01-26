/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';

import { reducerActions } from '../reducers/rootActions';
import { ReduxProps } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { DirectMessageParcel } from '../types/applicationWide';
import { formatTimeStamp } from '../util/time';
import { getUnreadMessages, updateMessageOnServer } from '../util/messages';

const toggleLanguage = (id: number, translated = '', original: string): void => {
  const element = document.getElementById(String(id));
  if (element) {
    if (element.innerText === translated) {
      element.innerText = original;
    } else if (element.innerText === original) {
      element.innerText = translated;
    }
  }
};

const MessageBoard = ({ store, actions }: ReduxProps): JSX.Element => {
  const { messages } = store;
  const messageArea: React.RefObject<HTMLDivElement> = React.createRef();
  const messageList = messages[store.client.chatPartner.id] || [];

  const userId = store.session.user.id;
  const chatPartnerId = store.client.chatPartner.id;

  useEffect(() => {
    if (messageArea.current) {
      messageArea.current.scrollTop = messageArea.current.scrollHeight;
    }
  }, [messageArea]);

  useEffect(() => {
    const unreadMessages = getUnreadMessages(messages, chatPartnerId, userId);
    if (!R.isEmpty(unreadMessages)) {
      Promise
        .all(unreadMessages.map((message) => updateMessageOnServer(message, { read: true })))
        .then(() => actions.readAllMessages(chatPartnerId));
    }
  }, [messages, chatPartnerId, userId, actions]);

  const isOwnMessage = (senderId: string): boolean => senderId === userId;

  const getPosition = (senderId: string): string => (
    isOwnMessage(senderId)
      ? 'right'
      : 'left'
  );

  return (
    <div className="messageboard" ref={messageArea}>
      <ul className="messageboard_list">
        {messageList.map((parcel: DirectMessageParcel, index: number) => (
          <li
            className={`messageboard_list_item ${getPosition(parcel.senderId)}`}
            key={parcel.timeStamp}
          >
            {isOwnMessage(parcel.senderId)
              ? <span>{parcel.message}</span>
              : (
                <span
                  id={String(index)}
                  onClick={(): void => toggleLanguage(index, parcel.translatedMessage, parcel.message)}
                >
                  {parcel.translatedMessage}
                </span>
              )}
            <span className="messageboard_list_item_time">{formatTimeStamp(parcel.timeStamp)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(MessageBoard);

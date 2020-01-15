import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { clientActions } from '../reducers/clientActions';
import { ReduxProps } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { DirectMessageParcel } from '../types/applicationWide';

const MessageBoard = ({ store }: ReduxProps): JSX.Element => {
  const messageArea: React.RefObject<HTMLDivElement> = React.createRef();
  const { messages, client } = store;

  useEffect(() => {
    if (messageArea.current) messageArea.current.scrollTop = messageArea.current.scrollHeight;
  }, [messages, messageArea]);

  const messageList = messages[client.chatPartner.id];
  const hasPriorMessages = Boolean(messageList);

  const getDateTimeString = (timeStamp: string): string => {
    const nowDate = new Date().toDateString();
    const messageTime = new Date(timeStamp);
    const messageDate = messageTime.toDateString();
    return (nowDate === messageDate)
      ? messageTime.toLocaleTimeString('sv-SV')
      : messageDate;
  };

  return (
    <div className="messageboard" ref={messageArea}>
      <ul className="messageboard_list">
        {hasPriorMessages
          ? messageList.map((parcel: DirectMessageParcel) => (
            <li
              className={`messageboard_list_item messageboard_list_item_${parcel.senderId === store.session.user.id ? 'right' : 'left'}`}
              key={parcel.timeStamp}
            >
              <span>{parcel.message}</span>
              <span className="messageboard_list_item_time">{getDateTimeString(parcel.timeStamp)}</span>
            </li>
          ))
          : []}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, clientActions, mergeProps)(MessageBoard);

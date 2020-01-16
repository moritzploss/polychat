import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { clientActions } from '../reducers/clientActions';
import { ReduxProps } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { DirectMessageParcel } from '../types/applicationWide';

const formatTimeStamp = (timeStamp: string): string => {
  const messageTime = new Date(timeStamp);
  const messageDate = messageTime.toDateString();
  return (messageDate === new Date().toDateString())
    ? messageTime.toLocaleTimeString('sv-SV')
    : messageDate;
};

const MessageBoard = ({ store }: ReduxProps): JSX.Element => {
  const { messages } = store;
  const messageArea: React.RefObject<HTMLDivElement> = React.createRef();
  const messageList = messages[store.client.chatPartner.id] || [];

  useEffect(() => {
    if (messageArea.current) {
      messageArea.current.scrollTop = messageArea.current.scrollHeight;
    }
  }, [messageArea]);


  const getPosition = (senderId: string): string => (
    senderId === store.session.user.id
      ? 'right'
      : 'left'
  );

  return (
    <div className="messageboard" ref={messageArea}>
      <ul className="messageboard_list">
        {messageList.map((parcel: DirectMessageParcel) => (
          <li
            className={`messageboard_list_item ${getPosition(parcel.senderId)}`}
            key={parcel.timeStamp}
          >
            <span>{parcel.message}</span>
            <span className="messageboard_list_item_time">{formatTimeStamp(parcel.timeStamp)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, clientActions, mergeProps)(MessageBoard);

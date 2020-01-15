import React from 'react';
import { connect } from 'react-redux';

import { clientActions } from '../reducers/clientActions';
import { ReduxProps } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { DirectMessageParcel } from '../types/applicationWide';

const MessageBoard = ({ store }: ReduxProps): JSX.Element => {
  const { messages, client } = store;

  const messageList = messages[client.chatPartner];
  const hasPriorMessages = Boolean(messageList);

  return (
    <div className="messageboard">
      <ul className="messageboard_list">
        {hasPriorMessages
          ? messageList.map((parcel: DirectMessageParcel) => (
            <li
              className={`messageboard_list_item messageboard_list_item_${parcel.senderId === store.session.user.id ? 'right' : 'left'}`}
              key={parcel.timeStamp}
            >
              {parcel.message}
            </li>
          ))
          : []}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, clientActions, mergeProps)(MessageBoard);
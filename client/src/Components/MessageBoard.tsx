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
    <>
      <h1>
        Message Board
      </h1>
      <ul>
        {hasPriorMessages ? messageList.map((parcel: DirectMessageParcel) => <li key={parcel.timeStamp}>{parcel.message}</li>) : []}
      </ul>
    </>
  );
};

export default connect(mapStateToProps, clientActions, mergeProps)(MessageBoard);

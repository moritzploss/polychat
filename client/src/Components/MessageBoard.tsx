import React from 'react';
import { connect } from 'react-redux';

import { clientActions } from '../reducers/clientActions';
import { Client } from '../types/client';
import { DirectMessageParcel, Messages } from '../types/applicationWide';

const MessageBoard = ({ client, messages, ...actions }: { client: Client; messages: Messages; actions: Record<string, Function>}): JSX.Element => {
  return (
    <>
      <h1>
        Message Board
      </h1>
      <ul>
        {messages[client.chatPartner] ? messages[client.chatPartner].map((parcel: DirectMessageParcel) => <li key={parcel.timeStamp}>{parcel.message}</li>) : []}
      </ul>
    </>
  );
};

interface PropTypes { client: Record<string, any>; messages: Messages}

const mapStateToProps = ({ client, messages }: PropTypes): PropTypes => ({
  client,
  messages,
});

export default connect(mapStateToProps, clientActions)(MessageBoard);

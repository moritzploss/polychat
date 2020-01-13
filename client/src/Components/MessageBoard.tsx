import React from 'react';
import { connect } from 'react-redux';

import { clientActions } from '../reducers/clientActions';
import { Client, Parcel } from '../types/types';

const MessageBoard = ({ client, messages, ...actions }: { client: Client; messages: Record<string, Parcel[]>; actions: Record<string, Function>}): JSX.Element => {
  return (
    <>
      <h1>
        Message Board
      </h1>
      <ul>
        {messages[client.chatPartner] ? messages[client.chatPartner].map((parcel: Parcel) => <li key={parcel.timeStamp}>{parcel.body.message}</li>) : []}
      </ul>
    </>
  );
};

interface PropTypes { client: Record<string, any>; messages: Record<string, Parcel[]>}

const mapStateToProps = ({ client, messages }: PropTypes): PropTypes => ({
  client,
  messages,
});

export default connect(mapStateToProps, clientActions)(MessageBoard);

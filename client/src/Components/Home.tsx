import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import { actions } from '../reducers/rootActions';
import { ReduxStoreContents } from '../types/client';
import Navigation from './Navigation';
import ContactList from './ContactList';
import MessageBoard from './MessageBoard';
import MessageEditor from './MessageEditor';
import { openNewWebSocket } from '../websockets/websockets';

const generateWebSocketId = (userId: string): string => `${userId}--${uuid()}`;

const Home = ({ store, ...actionBundle }: Record<string, any>): JSX.Element => {
  const { session, parcelService, client } = store;
  if (session.user.id && !parcelService.webSocket) {
    const webSocket = openNewWebSocket(generateWebSocketId(session.user.id));
    actionBundle.addParcelService(webSocket, actionBundle);
  }

  return (
    <>
      <Navigation />
      <ContactList />
      {!client.chatPartner
        ? ''
        : (
          <>
            <MessageBoard />
            <MessageEditor />
          </>
        )}
      <h1>
        Home
      </h1>
      <p>
        {store.session.user.name}
      </p>
    </>
  );
};

const mapStateToProps = (store: ReduxStoreContents): Record<string, ReduxStoreContents> => ({ store });

export default connect(mapStateToProps, actions)(Home);

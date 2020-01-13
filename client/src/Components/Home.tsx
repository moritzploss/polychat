import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import { clientActions } from '../reducers/clientActions';
import { ReduxStoreContents } from '../types/types';
import Navigation from './Navigation';
import { openNewWebSocket } from '../websockets/websockets';

interface HomeProps extends ReduxStoreContents {
  addParcelService: Function;
  initiateMessageStore: Function;
}

const generateWebSocketId = (userId: string): string => `${userId}--${uuid()}`;

const Home = ({ client, session, ...actions }: HomeProps): JSX.Element => {
  console.log(client);
  if (session.user.id && !client.parcelService.webSocket) {
    const webSocket = openNewWebSocket(generateWebSocketId(session.user.id));
    actions.initiateMessageStore();
    actions.addParcelService(webSocket, actions);
  }

  return (
    <>
      <Navigation />
      <h1>
        Home
      </h1>
      <p>
        {session.user.name}
        {session.user.id}
      </p>
    </>
  );
};

const mapStateToProps = ({ client, session }: ReduxStoreContents): ReduxStoreContents => ({
  client,
  session,
});

export default connect(mapStateToProps, clientActions)(Home);

import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import * as clientActions from '../reducers/clientActions';
import { ReduxStoreContents } from '../types/types';
import Navigation from './Navigation';
import { openNewWebSocket } from '../websockets/websockets';


interface HomeProps extends ReduxStoreContents {
  addParcelService: Function;
}

const generateWebSocketId = (userId: string): string => `${userId}--${uuid()}`;

const Home = ({ client, session, addParcelService }: HomeProps): JSX.Element => {
  if (session.user.id && !client.parcelService.webSocket) {
    const webSocket = openNewWebSocket(generateWebSocketId(session.user.id));
    addParcelService(webSocket);
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

const mapStateToProps = (store: ReduxStoreContents): ReduxStoreContents => store;

export default connect(mapStateToProps, clientActions)(Home);

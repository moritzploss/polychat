import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import { actions } from '../reducers/rootActions';
import { ReduxStoreContents } from '../types/types';
import Navigation from './Navigation';
import { openNewWebSocket } from '../websockets/websockets';

const generateWebSocketId = (userId: string): string => `${userId}--${uuid()}`;

const Home = ({ store, ...actionBundle }: Record<string, any>): JSX.Element => {
  console.log(store.client);
  if (store.session.user.id && !store.parcelService.webSocket) {
    const webSocket = openNewWebSocket(generateWebSocketId(store.session.user.id));
    actionBundle.addParcelService(webSocket, actionBundle);
  }

  return (
    <>
      <Navigation />
      <h1>
        Home
      </h1>
      <p>
        {store.session.user.name}
        {store.session.user.id}
      </p>
    </>
  );
};

const mapStateToProps = (store: ReduxStoreContents): Record<string, ReduxStoreContents> => ({ store });

export default connect(mapStateToProps, actions)(Home);

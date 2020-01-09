import React from 'react';
import { connect } from 'react-redux';

import * as clientActions from '../reducers/clientActions';
import { ReduxStoreContents } from '../types/types';
import Navigation from './Navigation';

interface HomeProps extends ReduxStoreContents {
  addWebsocket: Function;
}

const Home = ({ client, session, addWebsocket }: HomeProps): JSX.Element => {
  if (!client.websocket) {
    addWebsocket(session.user.id);
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

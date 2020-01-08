import React from 'react';
import { connect } from 'react-redux';

import * as clientActions from '../reducers/clientActions';
import { ReduxStoreContents } from '../types';

interface HomeProps extends ReduxStoreContents {
  addWebsocket: Function;
}

const Home = ({ client, user, addWebsocket }: HomeProps): JSX.Element => {
  if (!client.websocket) {
    addWebsocket(user.id);
  }

  return (
    <>
      <h1>
        Home
      </h1>
      <p>
        {user.name}
        {user.id}
      </p>
    </>
  );
};

const mapStateToProps = (store: ReduxStoreContents): ReduxStoreContents => store;

export default connect(mapStateToProps, clientActions)(Home);

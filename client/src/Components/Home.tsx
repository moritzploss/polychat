import React from 'react';
import { connect } from 'react-redux';

import { addWebsocket } from '../reducers/client';

const Home: React.FC = ({ client, user, addWebsocket }: any) => {

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
}

const mapStateToProps = ({ client, user }: any) => ({ client, user });

export default connect(mapStateToProps, { addWebsocket })(Home);

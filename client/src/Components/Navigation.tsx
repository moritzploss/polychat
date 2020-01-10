import React from 'react';
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';

import * as clientActions from '../reducers/clientActions';
import { ReduxStoreContents } from '../types/types';

const logout = async (removeWebsocket: Function): Promise<void> => {
  const res = await fetch('/api/destroy-session');
  if (res.status === 200) {
    removeWebsocket();
    sessionService.deleteSession();
    sessionService.deleteUser();
  }
};

const Navigation = ({ removeWebsocket }: {removeWebsocket: Function}): JSX.Element => {
  return (
    <ul>
      <li>
        <button type="button" onClick={(): Promise<void> => logout(removeWebsocket)}>
          Logout
        </button>
      </li>
    </ul>
  );
};

const mapStateToProps = (store: ReduxStoreContents): ReduxStoreContents => store;

export default connect(mapStateToProps, clientActions)(Navigation);

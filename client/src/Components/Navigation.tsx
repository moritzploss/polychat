import React from 'react';
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';

import * as clientActions from '../reducers/clientActions';
import { ReduxStoreContents } from '../types/types';

const logout = async (): Promise<void> => {
  const res = await fetch('/api/destroy-session');
  if (res.status === 200) {
    sessionService.deleteSession();
    sessionService.deleteUser();
  }
};

const Navigation = (): JSX.Element => {
  return (
    <ul>
      <li>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </li>
    </ul>
  );
};

const mapStateToProps = (store: ReduxStoreContents): ReduxStoreContents => store;

export default connect(mapStateToProps, clientActions)(Navigation);

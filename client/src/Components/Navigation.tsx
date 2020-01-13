import React from 'react';
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';

import { actions } from '../reducers/rootActions';
import { ReduxStoreContents } from '../types/client';

const logout = async (removeParcelService: Function): Promise<void> => {
  const res = await fetch('/api/destroy-session');
  if (res.status === 200) {
    await sessionService.deleteUser();
    await sessionService.deleteSession();
    removeParcelService();
  }
};

const Navigation = ({ removeParcelService, logOut }: Record<string, Function>): JSX.Element => {
  const resetApp = () => {
    removeParcelService();
    logOut();
  };

  return (
    <ul>
      <li>
        <button type="button" onClick={(): Promise<void> => logout(resetApp)}>
          Logout
        </button>
      </li>
    </ul>
  );
};

const mapStateToProps = (store: ReduxStoreContents): ReduxStoreContents => store;

export default connect(mapStateToProps, actions)(Navigation);

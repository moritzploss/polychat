import React from 'react';
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';

import * as clientActions from '../reducers/clientActions';
import { ReduxStoreContents } from '../types/types';

const logout = async (removeParcelService: Function): Promise<void> => {
  const res = await fetch('/api/destroy-session');
  if (res.status === 200) {
    await sessionService.deleteUser();
    await sessionService.deleteSession();
    removeParcelService();
  }
};

const Navigation = ({ removeParcelService }: {removeParcelService: Function}): JSX.Element => {
  return (
    <ul>
      <li>
        <button type="button" onClick={(): Promise<void> => logout(removeParcelService)}>
          Logout
        </button>
      </li>
    </ul>
  );
};

const mapStateToProps = (store: ReduxStoreContents): ReduxStoreContents => store;

export default connect(mapStateToProps, clientActions)(Navigation);

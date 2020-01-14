import React from 'react';
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';

import { reducerActions } from '../reducers/rootActions';
import { Store, ReducerActions } from '../types/client';

const logout = async (removeParcelService: Function): Promise<void> => {
  const res = await fetch('/api/destroy-session');
  if (res.status === 200) {
    await sessionService.deleteUser();
    await sessionService.deleteSession();
    removeParcelService();
  }
};

const Navigation = ({ removeParcelService, logOut }: ReducerActions): JSX.Element => {
  const resetApp = (): void => {
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

const mapStateToProps = (store: Store): Store => store;

export default connect(mapStateToProps, reducerActions)(Navigation);

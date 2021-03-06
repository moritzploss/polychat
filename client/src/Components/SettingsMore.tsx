import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import { sessionService } from 'redux-react-session';

import { ReduxProps, ReducerActions, Store } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { reducerActions } from '../reducers/rootActions';

const destroySession = async (userId: string): Promise<void> => {
  await fetch(`api/sessions/${userId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
};

const resetApp = async (store: Store, actions: ReducerActions): Promise<void> => {
  store.parcelService.webSocket.close();
  sessionService.deleteSession();
  sessionService.deleteUser();
  await destroySession(store.session.user.id);
  actions.logOut();
};

const SettingsMore = ({ store, actions }: ReduxProps): JSX.Element => (
  <div className="settings_block">
    <h2 className="settings_block_header">More</h2>
    <div className="settings_block_user">
      <span className="settings_block_user_prop">GDPR</span>
      <FontAwesomeIcon
        className="settings_block_user_button"
        icon={faBalanceScale}
        onClick={actions.goToGDPR}
      />
    </div>
    <div className="settings_block_user">
      <span className="settings_block_user_prop">Logout</span>
      <FontAwesomeIcon
        className="settings_block_user_button"
        icon={faArrowRight}
        onClick={(): Promise<void> => resetApp(store, actions)}
      />
    </div>
  </div>
);

export default connect(mapStateToProps, reducerActions, mergeProps)(SettingsMore);

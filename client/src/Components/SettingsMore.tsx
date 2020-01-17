import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBalanceScale } from '@fortawesome/free-solid-svg-icons';

import { ReduxProps, ReducerActions } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { reducerActions } from '../reducers/rootActions';

const resetApp = (actions: ReducerActions): void => {
  actions.removeParcelService();
  actions.logOut();
};

const SettingsMore = ({ actions }: ReduxProps): JSX.Element => (
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
        onClick={(): void => resetApp(actions)}
      />
    </div>
  </div>
);

export default connect(mapStateToProps, reducerActions, mergeProps)(SettingsMore);

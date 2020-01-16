import React from 'react';
import { connect } from 'react-redux';

import { mapStateToProps, mergeProps } from '../reducers/util';
import { reducerActions } from '../reducers/rootActions';

import SettingsUser from './SettingsUser';
import SettingsContactList from './SettingsContactList';
import SettingsMore from './SettingsMore';

const Settings = (): JSX.Element => (
  <div className="settings">
    <SettingsUser />
    <SettingsContactList />
    <SettingsMore />
  </div>
);

export default connect(mapStateToProps, reducerActions, mergeProps)(Settings);

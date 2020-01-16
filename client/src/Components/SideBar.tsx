import React from 'react';
import { connect } from 'react-redux';

import { clientActions } from '../reducers/clientActions';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { ReduxProps } from '../types/client';

import UserProfile from './UserProfile';
import Navigation from './Navigation';


const SideBar = ({ ownProps }: ReduxProps): JSX.Element => (
  <div className="home_sidebar">
    <UserProfile />
    {ownProps.content}
    <Navigation />
  </div>
);

export default connect(mapStateToProps, clientActions, mergeProps)(SideBar);

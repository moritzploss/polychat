/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import { connect } from 'react-redux';

import { reducerActions } from '../reducers/rootActions';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { ReduxProps } from '../types/client';

const UserProfile = ({ store, actions }: ReduxProps): JSX.Element => {
  const { session } = store;

  return (
    <div className="userprofile">
      <img
        alt="user avatar"
        className="userprofile_img"
        src={`${process.env.PUBLIC_URL}/avatars/${session.user.avatar}`}
      />
      <span
        className="userprofile_name"
        onClick={actions.goToSettings}
      >
        {session.user.name}
      </span>
      <span
        className="userprofile_language"
      >
        {session.user.language}
      </span>
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(UserProfile);

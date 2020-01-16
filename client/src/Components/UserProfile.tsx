import React from 'react';
import { connect } from 'react-redux';

import { clientActions } from '../reducers/clientActions';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { ReduxProps } from '../types/client';

const UserProfile = ({ store }: ReduxProps): JSX.Element => {
  const { session } = store;

  return (
    <div className="userprofile">
      <img
        alt="user avatar"
        className="userprofile_img"
        src={`${process.env.PUBLIC_URL}/avatars/${session.user.avatar}`}
      />
      <span className="userprofile_name">{session.user.name}</span>
      <span className="userprofile_language">{session.user.language}</span>
    </div>
  );
};

export default connect(mapStateToProps, clientActions, mergeProps)(UserProfile);

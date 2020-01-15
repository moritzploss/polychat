import React from 'react';
import { connect } from 'react-redux';

import { clientActions } from '../reducers/clientActions';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { ReduxProps } from '../types/client';
import { UserData } from '../types/applicationWide';

const getAvatarPath = (avatar: string) => (
  avatar.startsWith('http') ? avatar : `${process.env.PUBLIC_URL}/avatars/${avatar}`
);

const formatUserName = (user: UserData, sessionUser: UserData) => (
  `${user.name}${sessionUser.id === user.id ? ' (you)' : ''}`
);

const Contact = ({ ownProps, store }: ReduxProps): JSX.Element => {
  const { user, onClick } = ownProps;

  return (
    <li className={ownProps.className}>
      <button
        type="button"
        key={user.id}
        onClick={(): void => onClick(user)}
      >
        <img
          alt="user avatar"
          className={`${ownProps.className}_avatar`}
          src={getAvatarPath(user.avatar)}
        />
        <div className={`${ownProps.className}_details`}>
          <span className={`${ownProps.className}_details_name`}>{formatUserName(user, store.session.user)}</span>
          <span className={`${ownProps.className}_details_language`}>{user.language}</span>
        </div>
      </button>
    </li>
  );
};

export default connect(mapStateToProps, clientActions, mergeProps)(Contact);

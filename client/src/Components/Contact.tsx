import React from 'react';
import { connect } from 'react-redux';

import { clientActions } from '../reducers/clientActions';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { ReduxProps } from '../types/client';
import { getAvatarPath, formatUserName } from '../util/stringFormatting';

const Contact = ({ ownProps, store }: ReduxProps): JSX.Element => {
  const { user, onClick, className } = ownProps;

  return (
    <li className={className}>
      <button
        type="button"
        key={user.id}
        onClick={(): void => onClick(user)}
      >
        <img
          alt="user avatar"
          className={`${className}_avatar`}
          src={getAvatarPath(user.avatar)}
        />
        <div className={`${className}_details`}>
          <span className={`${className}_details_name`}>{formatUserName(user, store.session.user)}</span>
          <span className={`${className}_details_language`}>{user.language}</span>
        </div>
      </button>
    </li>
  );
};

export default connect(mapStateToProps, clientActions, mergeProps)(Contact);

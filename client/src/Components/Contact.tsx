import React from 'react';
import { connect } from 'react-redux';

import { clientActions } from '../reducers/clientActions';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { ReduxProps } from '../types/client';

const Contact = ({ ownProps, store }: ReduxProps): JSX.Element => {
  const { user, onClick } = ownProps;
  return (
    <li className={ownProps.className}>
      <button
        type="button"
        key={user.id}
        onClick={(): void => onClick(user.id)}
      >
        <span className={`${ownProps.className}_name`}>{`${user.name}${store.session.user.id === user.id ? ' (you)' : ''}`}</span>
        <span className={`${ownProps.className}_language`}>{user.language}</span>
      </button>
    </li>
  );
};

export default connect(mapStateToProps, clientActions, mergeProps)(Contact);

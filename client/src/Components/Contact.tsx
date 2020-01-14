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
        {`${user.name}${store.session.user.id === user.id ? ' (you)' : ''}`}
      </button>
    </li>
  );
};

export default connect(mapStateToProps, clientActions, mergeProps)(Contact);

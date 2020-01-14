import React from 'react';
import { connect } from 'react-redux';

import { clientActions } from '../reducers/clientActions';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { ReduxProps } from '../types/client';

const Contact = ({ actions, ownProps }: ReduxProps): JSX.Element => {
  const { user } = ownProps;
  return (
    <li className="contacts-list-item">
      <button
        type="button"
        key={user.id}
        onClick={() => actions.setChatPartner(user.id)}
      >
        {user.name}
      </button>
    </li>
  );
};

export default connect(mapStateToProps, clientActions, mergeProps)(Contact);

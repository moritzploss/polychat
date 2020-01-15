import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons';

import { clientActions } from '../reducers/clientActions';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { ReduxProps } from '../types/client';

const Welcome = ({ store }: ReduxProps): JSX.Element => {
  const contactListIsEmpty = store.client.contactList.length <= 1;

  const icon = contactListIsEmpty
    ? faSearch
    : faUser;

  const text = contactListIsEmpty
    ? 'Your Contactlist is empty!'
    : 'Select a Contact';

  return (
    <div className="welcome">
      <FontAwesomeIcon className="welcome_icon" icon={icon} />
      <h1 className="welcome_header">{text}</h1>
    </div>
  );
};

export default connect(mapStateToProps, clientActions, mergeProps)(Welcome);

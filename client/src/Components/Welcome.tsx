import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';

import { clientActions } from '../reducers/clientActions';
import { mapStateToProps, mergeProps } from '../reducers/util';

const Welcome = (): JSX.Element => (
  <div className="welcome">
    <FontAwesomeIcon className="welcome_icon" icon={faAddressCard} />
    <h1>Select a Contact</h1>
  </div>
);

export default connect(mapStateToProps, clientActions, mergeProps)(Welcome);

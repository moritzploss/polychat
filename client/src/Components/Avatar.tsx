/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { connect } from 'react-redux';

import { clientActions } from '../reducers/clientActions';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { ReduxProps } from '../types/client';

const Avatar = ({ ownProps }: ReduxProps): JSX.Element => {
  return (
    <img
      alt="avatar"
      src={ownProps.src}
      onClick={ownProps.onClick}
      className={ownProps.selected ? 'avatars_grid_selected' : ''}
    />
  );
};

export default connect(mapStateToProps, clientActions, mergeProps)(Avatar);

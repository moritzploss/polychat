import React from 'react';
import { connect } from 'react-redux';

import { clientActions } from '../reducers/clientActions';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { ReduxProps } from '../types/client';

const ChatPartnerProfile = ({ store }: ReduxProps): JSX.Element => {
  const { client } = store;
  return (
    <div className="chatpartnerprofile">
      <img alt="chatpartner avatar" className="chatpartnerprofile_img" src={`${process.env.PUBLIC_URL}/avatars/${client.chatPartner.avatar}`} />
      <span className="chatpartnerprofile_name">{client.chatPartner.name}</span>
    </div>
  );
};

export default connect(mapStateToProps, clientActions, mergeProps)(ChatPartnerProfile);

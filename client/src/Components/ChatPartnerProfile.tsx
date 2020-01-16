import React from 'react';
import { connect } from 'react-redux';

import { clientActions } from '../reducers/clientActions';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { ReduxProps } from '../types/client';
import { getAvatarPath } from '../util/stringFormatting';

const ChatPartnerProfile = ({ store }: ReduxProps): JSX.Element => {
  const { chatPartner } = store.client;

  const getOnlineStatus = (userId: string): string => (
    store.client.connectedUsers.includes(userId)
      ? 'online '
      : ''
  );

  return (
    <div className="chatpartnerprofile">
      <img
        alt="chatpartner avatar"
        className={`${getOnlineStatus(chatPartner.id)}chatpartnerprofile_img`}
        src={getAvatarPath(chatPartner.avatar)}
      />
      <span className="chatpartnerprofile_name">{chatPartner.name}</span>
      <span className="chatpartnerprofile_language">{chatPartner.language}</span>
    </div>
  );
};

export default connect(mapStateToProps, clientActions, mergeProps)(ChatPartnerProfile);

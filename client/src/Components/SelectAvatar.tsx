import React from 'react';
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';
import { errorCallback } from '../util/errors';

import { clientActions } from '../reducers/clientActions';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { ReduxProps } from '../types/client';
import { getAvatarPath } from '../util/stringFormatting';
import { requestWithJsonBody } from '../util/requests';

import Avatar from './Avatar';

const SelectAvatar = ({ store }: ReduxProps): JSX.Element => {
  const generateAvatarNames = (): string[] => {
    const avatarNames = [];
    for (let i = 1; i < 70; i += 1) {
      avatarNames.push(`avatar-${i}.svg`);
    }
    return avatarNames;
  };

  const submitAvatarChange = (avatarId: number): Promise<void> => requestWithJsonBody({
    errCallback: errorCallback,
    successCallback: sessionService.saveUser,
    url: '/api/users',
    type: 'PUT',
    body: {
      userId: store.session.user.id,
      avatar: `avatar-${avatarId}.svg`,
    },
  });

  const getAvatar = (avatarName: string, index: number): JSX.Element => {
    const path = getAvatarPath(avatarName);
    return (
      <Avatar
        src={path}
        onClick={(): Promise<void> => submitAvatarChange(index + 1)}
        key={index}
      />
    );
  };

  return (
    <div className="avatars">
      <h1 className="avatars_header">Choose Your Avatar</h1>
      <p className="avatars_description">Icons by Freepic from flaticon.com</p>
      <div className="avatars_grid">
        {generateAvatarNames().map(getAvatar)}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, clientActions, mergeProps)(SelectAvatar);

import React, { useState } from 'react';
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
  // const [string, setString] = useState('');

  const avatars = [
    'avatar-0.svg',
    'avatar-1.svg',
    'avatar-2.svg',
    'avatar-3.svg',
    'avatar-4.svg',
    'avatar-5.svg',
  ];

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

  // const submitAvatarChangeUrl = (url: string): Promise<void> => requestWithJsonBody({
  //   errCallback: errorCallback,
  //   successCallback: sessionService.saveUser,
  //   url: '/api/users',
  //   type: 'PUT',
  //   body: {
  //     userId: store.session.user.id,
  //     avatar: url,
  //   },
  // });

  const getAvatarComponent = (avatarName: string, index: number): JSX.Element => {
    const path = getAvatarPath(avatarName);
    return (
      <Avatar
        src={path}
        onClick={(): Promise<void> => submitAvatarChange(index)}
        key={index}
      />
    );
  };

  return (
    <div className="avatars">
      <h1 className="avatars_header">Choose Your Avatar</h1>
      <div className="avatars_grid">
        {avatars.map(getAvatarComponent)}
      </div>
      {/* <input
        type="text"
        onBlur={(): Promise<void> => submitAvatarChangeUrl(string)}
        onChange={(event): void => setString(event.target.value)}
      /> */}
    </div>
  );
};

export default connect(mapStateToProps, clientActions, mergeProps)(SelectAvatar);

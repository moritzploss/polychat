import React, { useState } from 'react';
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';

import { ReduxProps, ReactChangeEvent} from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { reducerActions } from '../reducers/rootActions';
import { requestWithJsonBody } from '../util/requests';
import { errorCallback } from '../util/errors';
import { onEnter } from '../util/events';

const SettingsUser = ({ store }: ReduxProps): JSX.Element => {
  const { user } = store.session;

  const [newUserName, setNewUserName] = useState(user.name);

  const submitUserNameChange = (): Promise<void> => requestWithJsonBody({
    errCallback: errorCallback,
    successCallback: sessionService.saveUser,
    url: '/api/users',
    type: 'PUT',
    body: {
      userId: user.id,
      name: newUserName,
    },
  });

  return (
    <div className="settings_block">
      <h2 className="settings_block_header">Your Profile</h2>
      <div className="settings_block_user">
        <input
          className="settings_block_user_name"
          type="text"
          value={newUserName}
          onBlur={submitUserNameChange}
          onClick={(event: ReactChangeEvent): void => event.target.select()}
          onChange={(event: ReactChangeEvent): void => setNewUserName(event.target.value)}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>): void => onEnter(event, submitUserNameChange)}
        />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(SettingsUser);

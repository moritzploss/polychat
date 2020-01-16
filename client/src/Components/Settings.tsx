import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faArrowRight, faBalanceScale } from '@fortawesome/free-solid-svg-icons';

import { ReduxProps, ReactChangeEvent } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { reducerActions } from '../reducers/rootActions';
import { UserData } from '../types/applicationWide';
import { putRequestJson, deleteRequestJson } from '../http/requests';
import { errorCallback } from '../util/errors';

// const logout = async (removeParcelService: Function): Promise<void> => {
//   const res = await fetch('/api/destroy-session');
//   if (res.status === 200) {
//     await sessionService.deleteUser();
//     await sessionService.deleteSession();
//     removeParcelService();
//   }
// };

const Settings = ({ store, actions }: ReduxProps): JSX.Element => {
  const { session, client } = store;

  const [newName, setNewName] = useState(session.user.name);

  const resetApp = (): void => {
    actions.removeParcelService();
    actions.logOut();
  };

  const removeFromUserContacts = (user: UserData): void => {
    const successCallback = (): void => {
      if (client.chatPartner.id === user.id) {
        actions.resetChatPartner();
      }
    };
    deleteRequestJson(errorCallback, successCallback, '/api/users', {
      userId: store.session.user.id,
      userToAdd: user.id,
    });
  };

  const updateNewName = (event: ReactChangeEvent): void => {
    setNewName(event.target.value);
  };

  const submitUserNameChange = (): void => {
    putRequestJson(
      errorCallback,
      console.log,
      '/api/users',
      {
        userId: store.session.user.id,
        name: newName,
      },
    );
  };

  return (
    <div className="settings">
      <div className="settings_block">
        <h2 className="settings_block_header">Your Profile</h2>
        <div className="settings_block_user">
          <input
            type="text"
            className="settings_block_user_name"
            onChange={updateNewName}
            onBlur={submitUserNameChange}
            value={newName}
            onClick={(event: ReactChangeEvent): void => event.target.select()}
          />
        </div>
      </div>
      <div className="settings_block">
        <h2 className="settings_block_header">Contacts</h2>
        {client.contactList
          .filter((user): boolean => user.id !== session.user.id)
          .map((user: UserData) => (
            <div className="settings_block_user" key={user.id}>
              <span className="settings_block_user_name">{user.name}</span>
              <FontAwesomeIcon
                className="settings_block_user_button"
                icon={faTimesCircle}
                onClick={(): void => removeFromUserContacts(user)}
              />
            </div>
          ))}
      </div>

      <div className="settings_block">
        <h2 className="settings_block_header">More</h2>
        <div className="settings_block_user">
          <span className="settings_block_user_name">GDPR</span>
          <FontAwesomeIcon
            className="settings_block_user_button"
            icon={faBalanceScale}
            onClick={actions.goToGDPR}
          />
        </div>
        <div className="settings_block_user">
          <span className="settings_block_user_name">Logout</span>
          <FontAwesomeIcon
            className="settings_block_user_button"
            icon={faArrowRight}
            onClick={resetApp}
          />
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(Settings);

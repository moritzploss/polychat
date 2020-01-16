/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faPen } from '@fortawesome/free-solid-svg-icons';

import { ReduxProps } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { reducerActions } from '../reducers/rootActions';
import { UserData } from '../types/applicationWide';
import { postRequestJson } from '../http/requests';
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

  // const resetApp = (): void => {
  //   actions.removeParcelService();
  //   actions.logOut();
  // };

  const removeFromUserContacts = (user: UserData): void => {
    const successCallback = (): void => {
      if (client.chatPartner.id === user.id) {
        actions.resetChatPartner();
      }
    };
    postRequestJson(errorCallback, successCallback, '/api/users/remove', {
      userId: store.session.user.id,
      userToAdd: user.id,
    });
  };

  const editUserData = (field: string) => {

  };

  const editableFields = ['name', 'language'];

  return (
    <div className="settings">
      <div className="settings_block">
        <h2 className="settings_block_header">Your Profile</h2>
        {editableFields.map((key: string) => (
          <div className="settings_block_user" key={key}>
            <span className="settings_block_user_name">{(session.user as any)[key]}</span>
            <FontAwesomeIcon
              className="settings_block_user_button"
              icon={faPen}
              onClick={(): void => editUserData(key)} />
          </div>
        ))}
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
        <div className="settings_block_logout">
          <button type="button">Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(Settings);

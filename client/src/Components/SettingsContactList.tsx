import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { ReduxProps } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { reducerActions } from '../reducers/rootActions';
import { UserData } from '../types/applicationWide';
import { httpRequest } from '../util/requests';

const SettingsContactList = ({ store, actions }: ReduxProps): JSX.Element => {
  const { chatPartner, contactList } = store.client;
  const { user } = store.session;

  const removeUserFromContactList = async (userData: UserData): Promise<void> => {
    const { error } = await httpRequest(
      `/api/users/${store.session.user.id}/contacts/${userData.id}`,
      'DELETE',
    );
    if (!error && (chatPartner.id === userData.id)) {
      actions.resetChatPartner();
    }
  };

  return (
    <div className="settings_block">
      <h2 className="settings_block_header">Contacts</h2>
      {contactList
        .filter((contact): boolean => contact.id !== user.id)
        .map((contact: UserData) => (
          <div className="settings_block_user" key={contact.id}>
            <span className="settings_block_user_prop">{contact.name}</span>
            <FontAwesomeIcon
              className="settings_block_user_button"
              icon={faTimesCircle}
              onClick={(): Promise<void> => removeUserFromContactList(contact)}
            />
          </div>
        ))}
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(SettingsContactList);

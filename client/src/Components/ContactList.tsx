import React from 'react';
import { connect } from 'react-redux';

import { ReduxProps } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { reducerActions } from '../reducers/rootActions';
import { UserData, Messages, DirectMessageParcel } from '../types/applicationWide';

import ContactMain from './ContactMain';

const ContactList = ({ ownProps, store }: ReduxProps): JSX.Element => {
  const getOnlineStatus = (userId: string): string => (
    store.client.connectedUsers.includes(userId)
      ? 'online '
      : ''
  );

  const hasUnreadMessages = (messages: Messages, contact: string): boolean => (
    Boolean(messages[contact].find((message: DirectMessageParcel) => !message.read))
  );

  const getReadStatusClass = (contactId: string): string => {
    if (store.messages[contactId]) {
      return hasUnreadMessages(store.messages, contactId)
        ? 'unread '
        : '';
    }
    return '';
  };

  return (
    <div className="contacts">
      <ul className="contacts_list">
        {ownProps.contactList.map((user: UserData) => (
          <ContactMain
            user={user}
            key={user.id}
            onClick={(): void => ownProps.clickHandler(user)}
            className={`${getReadStatusClass(user.id)}${getOnlineStatus(user.id)}contacts_list_item`}
          />
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(ContactList);

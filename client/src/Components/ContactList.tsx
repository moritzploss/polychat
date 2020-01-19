import React from 'react';
import { connect } from 'react-redux';

import { ReduxProps } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { hasUnreadMessages } from '../util/messages';
import { reducerActions } from '../reducers/rootActions';
import { UserData } from '../types/applicationWide';

import Contact from './Contact';

const ContactList = ({ ownProps, store }: ReduxProps): JSX.Element => {
  const getOnlineStatusClass = (userId: string): string => (
    store.client.connectedUsers.includes(userId)
      ? 'online '
      : ''
  );

  const getReadStatusClass = (chatPartnerId: string, userId: string): string => (
    hasUnreadMessages(store.messages, chatPartnerId, userId)
      ? 'unread '
      : ''
  );

  return (
    <div className="contacts">
      <ul className="contacts_list">
        {ownProps.contactList.map((user: UserData) => (
          <Contact
            user={user}
            key={user.id}
            onClick={(): void => ownProps.clickHandler(user)}
            unread={getReadStatusClass(user.id, store.session.user.id)}
            className={`${getOnlineStatusClass(user.id)}contacts_list_item`}
          />
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(ContactList);

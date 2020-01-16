import React from 'react';
import { connect } from 'react-redux';

import { ReduxProps } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { reducerActions } from '../reducers/rootActions';
import { UserData } from '../types/applicationWide';

import Contact from './Contact';

const ContactList = ({ ownProps, store }: ReduxProps): JSX.Element => {
  const getOnlineStatus = (userId: string): string => (
    store.client.connectedUsers.includes(userId)
      ? 'online '
      : ''
  );

  return (
    <div className="contacts">
      <ul className="contacts_list">
        {ownProps.contactList.map((user: UserData) => (
          <Contact
            user={user}
            key={user.id}
            onClick={(event: Event): void => ownProps.clickHandler(event, user)}
            className={`${getOnlineStatus(user.id)}contacts_list_item`}
          />
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(ContactList);

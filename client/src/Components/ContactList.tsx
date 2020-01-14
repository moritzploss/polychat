import React from 'react';
import { connect } from 'react-redux';

import { ReduxProps } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { reducerActions } from '../reducers/rootActions';
import { UserData } from '../types/applicationWide';

import Contact from './Contact';

const ContactList = ({ store, actions }: ReduxProps): JSX.Element => {
  const { client } = store;
  return (
    <div className="contacts">
      <h1>
        Contacts
      </h1>
      <ul className="contacts-list">
        {client.contactList.map((user: UserData) => (
          <Contact
            user={user}
            key={user.id}
            onClick={actions.setChatPartner}
          />
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(ContactList);

import React from 'react';
import { connect } from 'react-redux';

import { Store } from '../types/client';
import { mapStateToProps } from '../reducers/util';
import { UserCredentials } from '../types/applicationWide';

import Contact from './Contact';

const ContactList = ({ client }: Store): JSX.Element => {
  return (
    <div className="contacts">
      <h1>
        Contacts
      </h1>
      <ul className="contacts-list">
        {client.contactList.map((user: UserCredentials) => <Contact user={user} key={user.id} />)}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps)(ContactList);

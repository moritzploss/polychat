import React from 'react';
import { connect } from 'react-redux';

import { Client } from '../types/client';
import { UserCredentials } from '../types/applicationWide';

import Contact from './Contact';

const ContactList = ({ client }: { client: Client; setChatPartner: Function }): JSX.Element => {
  return (
    <div className="contacts">
      <h1>
        Contacts
      </h1>
      <ul className="contacts-list">
        {client.contactList.map((user: UserCredentials) => <Contact user={user} />)}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ client }: { client: Client }): Record<string, Client> => ({
  client,
});

export default connect(mapStateToProps)(ContactList);

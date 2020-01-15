import React, { useState } from 'react';
import { connect } from 'react-redux';

import { clientActions } from '../reducers/clientActions';
import { postRequestJson } from '../http/requests';

import { mapStateToProps, mergeProps } from '../reducers/util';
import { ReduxProps, ReactChangeEvent } from '../types/client';
import { UserData } from '../types/applicationWide';
import { useParams } from 'react-router';

import ContactList from './ContactList';

const ContactSearch = ({ store }: ReduxProps): JSX.Element => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const updateCredentials = (event: ReactChangeEvent): void | Promise<void> => {
    event.persist();
    setQuery(event.target.value);
    return (event.target.value === '')
      ? setSearchResult([])
      : postRequestJson(
        console.log,
        (body: Record<string, any>) => setSearchResult(body.result), '/api/users', { query: event.target.value },
      );
  };

  const addUserToContacts = (userToAdd: string): void => {
    postRequestJson(console.log, () => { }, '/api/users/add', {
      userId: store.session.user.id,
      userToAdd,
    });
  };

  return (
    <div className="contactsearch">
      <form className="contactsearch_form">
        <input
          className="contactsearch_form_input"
          type="text"
          id="contactsearch"
          name="contactsearch"
          value={query}
          onChange={updateCredentials}
          placeholder="Search Users..."
        />
      </form>
      <ContactList contactList={searchResult} />
    </div>
  );
};

export default connect(mapStateToProps, clientActions, mergeProps)(ContactSearch);

import React, { useState } from 'react';
import { connect } from 'react-redux';

import { reducerActions } from '../reducers/rootActions';
import { postRequestJson } from '../http/requests';
import { errorCallback } from '../util/errors';

import { mapStateToProps, mergeProps } from '../reducers/util';
import { ReduxProps, ReactChangeEvent } from '../types/client';
import { UserData } from '../types/applicationWide';

import ContactList from './ContactList';

const ContactSearch = ({ store, actions }: ReduxProps): JSX.Element => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const updateCredentials = (event: ReactChangeEvent): void | Promise<void> => {
    event.persist();
    setQuery(event.target.value);
    return (event.target.value === '')
      ? setSearchResult([])
      : postRequestJson(
        errorCallback,
        (body: Record<string, any>) => setSearchResult(body.result), '/api/users', { query: event.target.value },
      );
  };

  const addUserToContacts = (user: UserData): void => {
    postRequestJson(errorCallback, () => { }, '/api/users/add', {
      userId: store.session.user.id,
      userToAdd: user.id,
    });
  };

  const onClick = (event: Event, user: UserData): void => {
    addUserToContacts(user);
    actions.goToHome();
    actions.setChatPartner(user);
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
          placeholder="&#x1f50e; Search for Users"
        />
      </form>
      <ContactList
        contactList={searchResult}
        clickHandler={onClick}
      />
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(ContactSearch);

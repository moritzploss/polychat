import React, { useState } from 'react';
import { connect } from 'react-redux';

import { reducerActions } from '../reducers/rootActions';
import { requestWithJsonBody, getRequest } from '../util/requests';
import { errorCallback } from '../util/errors';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { ReduxProps, ReactChangeEvent } from '../types/client';
import { UserData } from '../types/applicationWide';

import ContactSearchList from './ContactSearchList';

const ContactSearch = ({ store, actions }: ReduxProps): JSX.Element => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const updateSearchResult = async (event: ReactChangeEvent): Promise<void> => {
    setQuery(event.target.value);
    if (event.target.value === '') {
      return setSearchResult([]);
    }
    const userData = await getRequest('/api/users', { name: event.target.value });
    setSearchResult(userData);
  };

  const addUserToContacts = (user: UserData): Promise<void> => requestWithJsonBody({
    errCallback: errorCallback,
    url: `/api/users/${store.session.user.id}/contacts`,
    type: 'POST',
    body: {
      contactId: user.id,
    },
  });

  const onContactClick = (event: Event, user: UserData): void => {
    addUserToContacts(user);
    actions.goToHome();
    actions.setChatPartner(user);
  };

  const onFormSubmit = (event: ReactChangeEvent): void => event.preventDefault();

  return (
    <div className="contactsearch">
      <form className="contactsearch_form" onSubmit={onFormSubmit}>
        <input
          className="contactsearch_form_input"
          type="text"
          id="contactsearch"
          name="contactsearch"
          value={query}
          onChange={updateSearchResult}
          placeholder="&#x1f50e; Search for Users"
          autoFocus
        />
      </form>
      <ContactSearchList
        contactList={searchResult}
        clickHandler={onContactClick}
      />
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(ContactSearch);

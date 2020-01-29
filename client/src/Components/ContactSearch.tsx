import React, { useState } from 'react';
import { connect } from 'react-redux';

import { reducerActions } from '../reducers/rootActions';
import { httpRequest, getRequest } from '../util/requests';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { ReduxProps, HttpResponse } from '../types/client';
import { UserData } from '../types/applicationWide';

import ContactSearchList from './ContactSearchList';

const ContactSearch = ({ store, actions }: ReduxProps): JSX.Element => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult]: [UserData[], Function] = useState([]);

  const updateSearchResult = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setQuery(event.target.value);
    if (event.target.value === '') {
      return setSearchResult([]);
    }
    const userData = await getRequest('/api/users', { name: event.target.value });
    return setSearchResult(userData as UserData[]);
  };

  const addUserToContacts = async (user: UserData): Promise<HttpResponse> => (
    httpRequest(
      `/api/users/${store.session.user.id}/contacts`,
      'POST',
      { contactId: user.id },
    )
  );

  const onContactClick = async (event: Event, user: UserData): Promise<void> => {
    const { error } = await addUserToContacts(user);
    if (!error) {
      actions.goToHome();
      actions.setChatPartner(user);
    }
  };

  const onFormSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => event.preventDefault();

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

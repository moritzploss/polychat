import React, { useState } from 'react';
import { connect } from 'react-redux';

import { clientActions } from '../reducers/clientActions';
import { postRequestJson } from '../http/requests';

import { mapStateToProps, mergeProps } from '../reducers/util';
import { ReduxProps, ReactChangeEvent } from '../types/client';
import { UserData } from '../types/applicationWide';

const ContactSearch = ({ store }: ReduxProps): JSX.Element => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const updateCredentials = (event: ReactChangeEvent): void => {
    event.persist();
    setQuery(event.target.value);
    postRequestJson(console.log, (body: Record<string, any>) => setSearchResult(body.result), '/api/users', { query });
  };

  const addUserToContacts = (userToAdd: string): void => {
    postRequestJson(console.log, () => { }, '/api/users/add', {
      userId: store.session.user.id,
      userToAdd,
    });
  };

  return (
    <>
      <h1>
        Find Contacts
      </h1>
      <form>
        <input
          type="text"
          id="contactsearch"
          name="contactsearch"
          value={query}
          onChange={updateCredentials}
        />
      </form>
      {searchResult.map((user: UserData) => (
        <button
          type="button"
          key={user.id}
          onClick={(): void => addUserToContacts(user.id)}
        >
          {user.name}
        </button>
      ))}
    </>
  );
};

export default connect(mapStateToProps, clientActions, mergeProps)(ContactSearch);

import React from 'react';
import { connect } from 'react-redux';

import { ReduxProps } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { reducerActions } from '../reducers/rootActions';
import { UserData } from '../types/applicationWide';

import Contact from './Contact';

const ContactList = ({ ownProps }: ReduxProps): JSX.Element => {
  const { contactList, clickHandler } = ownProps;

  return (
    <div className="contacts">
      <ul className="contacts_list">
        {contactList.map((user: UserData) => (
          <Contact
            user={user}
            key={user.id}
            onClick={(event: Event): void => clickHandler(event, user)}
            className="contacts_list_item"
          />
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(ContactList);

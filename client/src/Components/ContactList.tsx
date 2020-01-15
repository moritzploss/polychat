import React from 'react';
import { connect } from 'react-redux';

import { ReduxProps } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { reducerActions } from '../reducers/rootActions';
import { UserData } from '../types/applicationWide';

import Contact from './Contact';

const ContactList = ({ store, actions, ownProps }: ReduxProps): JSX.Element => {
  const { contactList } = ownProps;
  return (
    <div className="contacts">
      <ul className="contacts_list">
        {contactList.map((user: UserData) => (
          <Contact
            user={user}
            key={user.id}
            onClick={actions.setChatPartner}
            className="contacts_list_item"
          />
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(ContactList);

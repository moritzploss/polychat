import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import { clientActions } from '../reducers/clientActions';
import { ReduxStoreContents } from '../types/types';
import Navigation from './Navigation';
import { openNewWebSocket } from '../websockets/websockets';

interface HomeProps extends ReduxStoreContents {
  addParcelService: Function;
  initiateMessageStore: Function;
}

const ContactList = ({ client, session, ...actions }: HomeProps): JSX.Element => {
  return (
    <>
      <h1>
        Contacts
      </h1>
    </>
  );
};

const mapStateToProps = ({ client, session }: ReduxStoreContents): ReduxStoreContents => ({
  client,
  session,
});

export default connect(mapStateToProps, clientActions)(ContactList);

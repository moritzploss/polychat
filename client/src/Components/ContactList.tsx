import React from 'react';
import { connect } from 'react-redux';

import { clientActions } from '../reducers/clientActions';
import { ReduxStoreContents } from '../types/types';

interface HomeProps extends ReduxStoreContents {
  addParcelService: Function;
}

const ContactList = ({ client, ...actions }: HomeProps): JSX.Element => {
  return (
    <>
      <h1>
        Contacts
      </h1>
    </>
  );
};

const mapStateToProps = ({ client }: ReduxStoreContents): ReduxStoreContents => ({
  client,
});

export default connect(mapStateToProps, clientActions)(ContactList);

import React from 'react';
import { connect } from 'react-redux';

import { clientActions } from '../reducers/clientActions';
import { Client, UserCredentials } from '../types/types';

const Contact = ({ setChatPartner, user }: { setChatPartner: Function; user: UserCredentials }): JSX.Element => {
  return (
    <li className="contacts-list-item">
      <button
        type="button"
        key={user.id}
        onClick={(): void => setChatPartner(user.id)}
      >
        {user.name}
      </button>
    </li>
  );
};

const mapStateToProps = ({ client }: { client: Client }): Record<string, Client> => ({
  client,
});

export default connect(mapStateToProps, clientActions)(Contact);

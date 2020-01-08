import React from 'react';
import { connect } from 'react-redux';

import * as userActions from '../reducers/userActions';

interface LoginProps {
  addUser: Function;
}

const Login = ({ addUser }: LoginProps): JSX.Element => {
  return (
    <>
      <h1>
        Login
      </h1>
      <button type="button" onClick={(): void => addUser({ name: 'Test User' })}>Login</button>
    </>
  );
};

export default connect(null, userActions)(Login);

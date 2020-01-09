import React, { useState, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';

import { UserData } from '../types/types';

import { postRequestJson } from '../http/requests';
import LabeledInputField from './LabeledInputField';

const loginErrorCallback = console.log;

const Login = (): JSX.Element => {
  const defaultCredentials = { email: '', password: '' };
  const [credentials, setCredentials] = useState(defaultCredentials);

  const updateCredentials = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setCredentials((previousCredentials) => ({
      ...previousCredentials,
      [event.target.name]: event.target.value,
    }));
  };

  const loginSuccessCallback = (userData: UserData): void => {
    sessionService.saveSession();
    sessionService.saveUser(userData);
  };

  const attemptLogin = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    event.preventDefault();
    postRequestJson(
      loginErrorCallback,
      loginSuccessCallback,
      '/api/login',
      credentials,
    );
  };

  return (
    <>
      <h1>
        Login
      </h1>
      <form>
        <LabeledInputField
          type="text"
          id="email"
          name="email"
          value={credentials.email}
          onChange={updateCredentials}
        />
        <LabeledInputField
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={updateCredentials}
        />
        <button type="submit" onClick={attemptLogin}>Login</button>
      </form>
    </>
  );
};

export default connect(null, {})(Login);

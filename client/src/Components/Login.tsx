import React, { useState, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';

import { LoginResponseData, ReduxStoreContents } from '../types/types';

import { appStateActions } from '../reducers/appStateActions';
import { postRequestJson } from '../http/requests';
import LabeledInputField from './LabeledInputField';

const loginErrorCallback = console.log;

interface Props extends ReduxStoreContents {
  goToHome: Function;
}

const Login = ({ goToHome }: Props): JSX.Element => {
  const defaultCredentials = { email: '', password: '' };
  const [credentials, setCredentials] = useState(defaultCredentials);

  const updateCredentials = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setCredentials((previousCredentials) => ({
      ...previousCredentials,
      [event.target.name]: event.target.value,
    }));
  };

  const loginSuccessCallback = (responseData: LoginResponseData): void => {
    sessionService.saveSession();
    sessionService.saveUser(responseData);
    goToHome();
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

const mapStateToProps = (store: ReduxStoreContents): ReduxStoreContents => store;

export default connect(mapStateToProps, appStateActions)(Login);

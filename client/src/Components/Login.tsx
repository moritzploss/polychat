import React, { useState, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';

import { AppStateActions } from '../types/client';
import { UserData } from '../types/applicationWide';
import { mapStateToProps } from '../reducers/util';
import { errorCallback } from '../util/errors';
import { appStateActions } from '../reducers/appStateActions';
import { requestWithJsonBody } from '../util/requests';

import LabeledInputField from './LabeledInputField';

const Login = ({ goToHome }: AppStateActions): JSX.Element => {
  const defaultCredentials = { email: '', password: '' };
  const [credentials, setCredentials] = useState(defaultCredentials);

  const updateCredentials = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setCredentials((previousCredentials) => ({
      ...previousCredentials,
      [event.target.name.toLowerCase()]: event.target.value,
    }));
  };

  const loginSuccessCallback = (user: UserData): void => {
    sessionService.saveSession();
    sessionService.saveUser(user);
    goToHome();
  };

  const attemptLogin = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    event.preventDefault();
    requestWithJsonBody({
      errCallback: errorCallback,
      successCallback: loginSuccessCallback,
      url: '/api/login',
      type: 'POST',
      body: credentials,
    });
  };

  return (
    <div className="login">
      <h1 className="login_header">
        Login
      </h1>
      <form className="login_form">
        <LabeledInputField
          type="text"
          id="email"
          name="Email"
          className="login_form_input"
          value={credentials.email}
          onChange={updateCredentials}
        />
        <LabeledInputField
          type="password"
          id="password"
          name="Password"
          className="login_form_input"
          value={credentials.password}
          onChange={updateCredentials}
        />
        <button type="submit" onClick={attemptLogin}>Login</button>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, appStateActions)(Login);

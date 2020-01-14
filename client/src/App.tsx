import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { ReduxProps } from './types/client';

import { mapStateToProps, mergeProps } from './reducers/util';
import { appStates } from './reducers/appState';
import { appStateActions } from './reducers/appStateActions';

import './App.css';

const App = ({ store, actions }: ReduxProps): JSX.Element => {
  if (store.session.user.id && (store.appState.currentState === appStates.loggedOut)) {
    actions.goToHome();
  }

  switch (store.appState.currentState) {
    case appStates.loggedOut:
      return <Redirect to="/login" />;
    default:
      return <Redirect to="/" />;
  }
};

export default connect(mapStateToProps, appStateActions, mergeProps)(App);

import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { ReduxStoreContents } from './types/types';

import { appStates } from './reducers/appState';

import './App.css';

const App = ({ appState }: ReduxStoreContents): JSX.Element => {
  switch (appState.currentState) {
    case appStates.loggedOut:
      return <Redirect to="/login" />;
    default:
      return <Redirect to="/" />;
  }
};

const mapStateToProps = (store: ReduxStoreContents): ReduxStoreContents => store;

export default connect(mapStateToProps)(App);

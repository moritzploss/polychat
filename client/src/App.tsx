import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Store } from './types/client';

import { appStates } from './reducers/appState';

import './App.css';

const App = ({ appState }: Store): JSX.Element => {
  switch (appState.currentState) {
    case appStates.loggedOut:
      return <Redirect to="/login" />;
    default:
      return <Redirect to="/" />;
  }
};

const mapStateToProps = (store: Store): Store => store;

export default connect(mapStateToProps)(App);

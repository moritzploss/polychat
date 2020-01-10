import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { ReduxStoreContents, UserData } from './types/types';

import './App.css';

const App = ({ session }: { user: UserData; session: any }): JSX.Element => {
  return <Redirect to={session.authenticated ? '/' : '/login'} />;
};

const mapStateToProps = (store: ReduxStoreContents): ReduxStoreContents => store;

export default connect(mapStateToProps)(App);

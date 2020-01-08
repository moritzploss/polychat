import React from 'react';
import * as R from 'ramda';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { ReduxStoreContents, UserData } from './types';

import './App.css';

const App = ({ user }: { user: UserData }): JSX.Element => (
  <Redirect to={R.isEmpty(user) ? '/login' : '/'} />
);

const mapStateToProps = (store: ReduxStoreContents): ReduxStoreContents => store;

export default connect(mapStateToProps)(App);

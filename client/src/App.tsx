import React from 'react';
import * as R from 'ramda';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

const App: React.FC = ({ user }: any) => (
  <Redirect to={R.isEmpty(user) ? '/login' : '/home'} />
);

const mapStateToProps = ({ user }: any) => ({ user });

export default connect(mapStateToProps)(App);

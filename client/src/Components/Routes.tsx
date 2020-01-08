import React from 'react';
import { Route, Switch } from "react-router-dom";

import Home from '../Components/Home';
import Login from '../Components/Login';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/" component={Home}>
        <Home />
      </Route>
    </Switch>
  );
}

export { Routes };

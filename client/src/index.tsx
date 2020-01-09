import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { initiateSessionService } from './sessions/reduxSessions';
import { rootReducer } from './reducers/root';
import * as serviceWorker from './serviceWorker';
import { Routes } from './Components/Routes';

import './index.css';

const store = createStore(rootReducer);
initiateSessionService(store);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

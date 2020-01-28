import { combineReducers, createStore, compose } from 'redux';
import { sessionReducer } from 'redux-react-session';

import { appStateReducer } from './appState';
import { clientReducer } from './client';
import { messageReducer } from './messages';
import { parcelServiceReducer } from './parcelService';
import { initiateSessionService } from '../sessions/reduxSessions';

const rootReducer = combineReducers({
  appState: appStateReducer,
  client: clientReducer,
  messages: messageReducer,
  session: sessionReducer,
  parcelService: parcelServiceReducer,
});

const appReducer = (state: any, action: any) => (
  (action.type === 'USER LOGOUT')
    ? rootReducer(undefined, action)
    : rootReducer(state, action)
);

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = (process.env.NODE_ENV !== 'production')
  ? createStore(appReducer, composeEnhancers())
  : createStore(appReducer);

initiateSessionService(store);

export { store };

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

const appReducer = (state: any, action: any) => {
  if (action.type === 'USER LOGOUT') {
    state = undefined;
  }
  return rootReducer(state, action);
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(appReducer, composeEnhancers());
initiateSessionService(store);

export { store };

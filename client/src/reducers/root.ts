import { combineReducers, createStore } from 'redux';
import { sessionReducer } from 'redux-react-session';

import { clientReducer } from './client';
import { initiateSessionService } from '../sessions/reduxSessions';

const rootReducer = combineReducers({
  client: clientReducer,
  session: sessionReducer,
});

const store = createStore(rootReducer);
initiateSessionService(store);

export { store };

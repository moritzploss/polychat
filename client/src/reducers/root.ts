import { combineReducers, createStore } from 'redux';
import { sessionReducer } from 'redux-react-session';

import { clientReducer } from './client';
import { messageReducer } from './messages';
import { parcelServiceReducer } from './parcelService';
import { initiateSessionService } from '../sessions/reduxSessions';

const rootReducer = combineReducers({
  client: clientReducer,
  messages: messageReducer,
  session: sessionReducer,
  parcelService: parcelServiceReducer,
});

const store = createStore(rootReducer);
initiateSessionService(store);

export { store };

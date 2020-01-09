import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';

import { clientReducer } from './client';

const rootReducer = combineReducers({
  client: clientReducer,
  session: sessionReducer,
});

export { rootReducer };

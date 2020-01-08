import { combineReducers } from 'redux';

import { clientReducer } from './client';
import { userReducer } from './user';

const rootReducer = combineReducers({
  client: clientReducer,
  user: userReducer,
});

export { rootReducer };

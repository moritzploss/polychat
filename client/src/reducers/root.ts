import { combineReducers } from 'redux';

import { client } from './client';
import { user } from './user';

const rootReducer = combineReducers({
  client,
  user,
})

export { rootReducer };

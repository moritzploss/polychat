import { authenticateRequest } from '../controllers/authentication';
import { validateSession, destroySession } from '../controllers/session';
import { findUsers, addUserToContactList, removeUserFromContactList } from '../controllers/users';

import express = require('express');

const apiRouter = express.Router();

apiRouter.post('/login', authenticateRequest);

apiRouter.get('/validate-session', validateSession);

apiRouter.get('/destroy-session', destroySession);

apiRouter.post('/users/add', addUserToContactList);

apiRouter.post('/users/remove', removeUserFromContactList);

apiRouter.post('/users', findUsers);

export { apiRouter };

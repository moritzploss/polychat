import { authenticateRequest } from '../controllers/authentication';
import { validateSession, destroySession } from '../controllers/session';
import { findUsers } from '../controllers/users';

import express = require('express');

const apiRouter = express.Router();

apiRouter.post('/login', authenticateRequest);

apiRouter.get('/validate-session', validateSession);

apiRouter.get('/destroy-session', destroySession);

apiRouter.post('/users', findUsers);

export { apiRouter };

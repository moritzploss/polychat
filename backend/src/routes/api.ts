import { authenticateRequest } from '../controllers/authentication';
import { validateSession, destroySession } from '../controllers/session';

import express = require('express');

const apiRouter = express.Router();

apiRouter.post('/login', authenticateRequest);

apiRouter.get('/validate-session', validateSession);

apiRouter.get('/destroy-session', destroySession);

export { apiRouter };

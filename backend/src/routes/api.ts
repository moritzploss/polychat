import * as express from 'express';

import { loginUser } from '../controllers/login';
import { validateSession, deleteSession } from '../controllers/session';
import { authorizeOrReject } from '../controllers/authorization';

const apiRouter = express.Router();

apiRouter.post('/login', loginUser);

apiRouter.get('/sessions', validateSession); // should be /sessions/:userId
apiRouter.delete('/sessions/:userId', authorizeOrReject, deleteSession);

export { apiRouter };

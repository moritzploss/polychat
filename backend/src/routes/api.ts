import { authenticateRequest } from '../controllers/authentication';
import { setReadStatus } from '../controllers/messages';
import { validateSession, destroySession } from '../controllers/session';
import {
  getUsers, addContact, removeContact, updateUser, getUser,
} from '../controllers/users';

import express = require('express');

const apiRouter = express.Router();

apiRouter.post('/login', authenticateRequest);

apiRouter.get('/validate-session', validateSession);

apiRouter.get('/destroy-session', destroySession);

apiRouter.put('/direct-message', setReadStatus);

apiRouter.post('/contactlist', addContact);
apiRouter.delete('/contactlist', removeContact);

apiRouter.get('/users', getUsers);
apiRouter.get('/users/:id', getUser);
apiRouter.put('/users/:id', updateUser);

export { apiRouter };

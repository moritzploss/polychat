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

apiRouter.put('/users/:userId/messages/:contactId/:messageId', setReadStatus);

apiRouter.post('/users/:userId/contacts', addContact);
apiRouter.delete('/users/:userId/contacts/:contactId', removeContact);

apiRouter.get('/users', getUsers);
apiRouter.get('/users/:userId', getUser);
apiRouter.put('/users/:userId', updateUser);

export { apiRouter };

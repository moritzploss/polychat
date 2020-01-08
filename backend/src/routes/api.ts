import { authenticateRequest } from '../controllers/authentication';

import express = require('express');

const apiRouter = express.Router();

apiRouter.post('/login', authenticateRequest);

export { apiRouter };

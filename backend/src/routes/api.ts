import { authenticateRequest } from '../controllers/authentication';

import { logger } from '../logging/index';

import express = require('express');

const apiRouter = express.Router();

apiRouter.post('/login', authenticateRequest);

apiRouter.get('/validate-session', (req, res) => {
  const status = req.session.authorized ? 200 : 401;
  return res.status(status).send();
});

apiRouter.get('/invalidate-session', (req, res) => {
  req.session.destroy(logger.error);
  return res.send();
});

export { apiRouter };

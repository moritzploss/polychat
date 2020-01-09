import { authenticateRequest } from '../controllers/authentication';

import express = require('express');

const apiRouter = express.Router();

apiRouter.post('/login', authenticateRequest);

apiRouter.get('/validate-session', (req, res) => {
  const status = req.session.authorized ? 200 : 401;
  return res.status(status).send();
});

export { apiRouter };

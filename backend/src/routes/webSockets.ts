import * as wsController from '../controllers/webSockets';

import express = require('express');
import expressWs = require('express-ws');

expressWs(express());
const socketsRouter = express.Router();

socketsRouter.ws(
  '/clients/:id',
  wsController.authenticateWebSocket,
  wsController.setupEventListeners,
);

export { socketsRouter };

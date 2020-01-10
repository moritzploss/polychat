import * as wsController from '../controllers/webSockets';

import express = require('express');
import expressWs = require('express-ws');

expressWs(express());
const webSocketsRouter = express.Router();

webSocketsRouter.ws(
  '/clients/:id',
  wsController.authenticateWebSocket,
  wsController.setupEventListeners,
);

export { webSocketsRouter };

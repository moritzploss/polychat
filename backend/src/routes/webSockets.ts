import { Request } from 'express-serve-static-core';
import * as ws from 'ws';

import * as wsController from '../controllers/webSockets';

import express = require('express');
import expressWs = require('express-ws');

expressWs(express());
const socketsRouter = express.Router();

socketsRouter.ws('/clients/:id', (webSocket: ws, req: Request): void => {
  wsController.onOpen(webSocket, req, req.params.id);
  webSocket.on('message', wsController.onMessage);
  webSocket.on('close', wsController.onClose);
});

export default socketsRouter;

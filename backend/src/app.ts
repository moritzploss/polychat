import { loggStream } from './logging';
import { apiRouter } from './routes/api';
import { repository } from './services/repository';
import { sessionConfig } from './sessions/expressSession';
import { webSocketsRouter } from './routes/webSockets';

import bodyParser = require('body-parser');
import express = require('express');
import helmet = require('helmet');
import morgan = require('morgan');
import expressWs = require('express-ws');

const { app } = expressWs(express());

app.use(helmet());
app.use(bodyParser.json());
app.use(sessionConfig);
app.use(morgan('tiny', { stream: loggStream }));

repository.connectDatabase();

app.use('/api/websockets', webSocketsRouter);
app.use('/api', apiRouter);

export default app;

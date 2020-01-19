import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as expressWs from 'express-ws';

import { loggStream } from './logging';
import { apiRouter } from './routes/api';
import { repository } from './services/repository';
import { sessionConfig } from './sessions/expressSession';
import { webSocketsRouter } from './routes/webSockets';

const { app } = expressWs(express());

app.use(helmet());
app.use(bodyParser.json());
app.use(sessionConfig);
app.use(morgan('tiny', { stream: loggStream }));

repository.connectDatabase();

app.use('/api/websockets', webSocketsRouter);
app.use('/api', apiRouter);

export default app;

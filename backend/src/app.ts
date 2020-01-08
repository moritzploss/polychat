import socketsRouter from './routes/webSockets';
import { loggStream } from './logging';
import { connectDatabase, addTestUser } from './services/database';

import bodyParser = require('body-parser');
import express = require('express');
import helmet = require('helmet');
import morgan = require('morgan');
import expressWs = require('express-ws');

const { app } = expressWs(express());

app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('tiny', { stream: loggStream }));

connectDatabase().then(() => addTestUser());

app.use('/api/websockets', socketsRouter);

app.get('/api/login', (req, res) => res.send('hi'));

export default app;

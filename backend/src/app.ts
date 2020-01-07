import socketsRouter from './routes/sockets';
import { loggStream } from './logging';

import bodyParser = require('body-parser');
import express = require('express');
import helmet = require('helmet');
import morgan = require('morgan');
import expressWs = require('express-ws');

const { app } = expressWs(express());

app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('tiny', { stream: loggStream }));

app.use('/api/sockets', socketsRouter);

app.get('/api/login', (req, res) => res.send('hi'));

export default app;

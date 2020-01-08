import * as mongoose from 'mongoose';

import { User } from '../schemas/user';
import { logger } from '../logging';

// const session = require('express-session');
// const mongoStore = require('connect-mongo')(session);

const connectDatabase = async (): Promise<mongoose.Connection> => {
  const credentials = `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}`;
  mongoose.connect(
    `mongodb+srv://${credentials}@polychat-afdg1.mongodb.net/test?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  );
  mongoose.connection.on('error', logger.error);
  mongoose.connection.once('open', () => logger.info('connected to mongo db'));
  return mongoose.connection;
};

const addTestUser = async (): Promise<void> => {
  const testUser = new User({
    email: process.env.TEST_USER_EMAIL,
    password: process.env.TEST_USER_PASSWORD,
    name: 'Test User',
    language: 'english',
  });
  await testUser.save(() => {});
};

export { connectDatabase, addTestUser };

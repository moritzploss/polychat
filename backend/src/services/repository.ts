import * as mongoose from 'mongoose';

import { logger } from '../logging';
import { User, UserMongoose } from '../schemas/user';

// const session = require('express-session');
// const mongoStore = require('connect-mongo')(session);

class Repository {
  user: UserMongoose;

  constructor(user: UserMongoose) {
    this.user = user;
  }

  connectDatabase = async (): Promise<mongoose.Connection> => {
    mongoose.connect(
      process.env.MONGO_CONNECTION_STRING,
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

  addTestUser = async (): Promise<void> => {
    const testUser = new User({
      email: process.env.TEST_USER_EMAIL,
      password: process.env.TEST_USER_PASSWORD,
      name: 'Test User',
      language: 'english',
      messages: {
        test: [1, 2, 3],
      },
      contacts: [
        '5e1c5a31511ff782a56c837b',
      ],
    });
    await testUser.save(() => {});
  };

  getUserMessages = (userId: string, callback: Function): void => {
    this.user.findById(userId, (error: Error, data) => callback(error ? {} : data.messages));
  };

  getUserContacts = (userId: string, callback: Function): void => {
    this.user.findById(userId, (error: Error, data) => callback(error ? [] : data.contacts));
  };

  getUsersById = (userIds: string[], callback: Function): void => {
    this.user.find({
      _id: { $in: userIds.map((id) => mongoose.Types.ObjectId(id)) },
    }, (error: Error, users: mongoose.Document) => callback(error ? [] : users));
  };
}

const repository = new Repository(User);

export { repository, Repository };

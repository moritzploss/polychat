import * as mongoose from 'mongoose';

import { logger } from '../logging';
import { User, UserMongoose } from '../schemas/user';
import { DirectMessageParcel, Messages, Parcel } from '../types/applicationWide';

// const session = require('express-session');
// const mongoStore = require('connect-mongo')(session);

const updateDirectMessages = (messages: Messages, parcel: DirectMessageParcel, senderId: string = parcel.senderId): Messages => {
  const newMessages = messages[senderId]
    ? [...messages[senderId], parcel]
    : [parcel];
  return {
    ...messages,
    [senderId]: newMessages,
  };
};

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

  saveParcelToUserMessages = (parcel: DirectMessageParcel, senderId: string, receiverId: string): void => {
    this.user.findById(senderId, (error: Error, user) => {
      if (error) return logger.error(error);
      User.updateOne(
        { _id: senderId },
        { $set: { messages: updateDirectMessages(user.messages, parcel, receiverId) } },
        logger.error,
      );
      return logger.info({
        message: 'saved DirectMessageParcel to message database',
        parcel,
      });
    });
  };

  saveDirectMessage = (parcel: DirectMessageParcel): void => {
    this.saveParcelToUserMessages(parcel, parcel.senderId, parcel.receiverId);
    this.saveParcelToUserMessages(parcel, parcel.receiverId, parcel.senderId);
  };

  findUsersByName = (userName: string, callback: Function): void => {
    const regex = RegExp(userName);
    this.user.find({ name: { $regex: regex, $options: 'i' } }, (error: Error, data) => {
      callback(error, data);
    });
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

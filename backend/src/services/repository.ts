import * as mongoose from 'mongoose';

import { logger } from '../logging';
import { User, UserMongoose } from '../schemas/user';
import { testUsers } from '../util/testUsers';
import { DirectMessageParcel, Messages, UserData } from '../types/applicationWide';
import { MongooseUser, UpdatableUserData, MongoRegexQuery } from '../types/backend';
import { toUserData } from '../controllers/login';
import { safely } from '../util/safeAsyncFunctions';

const addParcelToMessages = (messages: Messages, parcel: DirectMessageParcel, senderId: string = parcel.senderId): Messages => {
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
    mongoose.connection.once('open', () => {
      logger.info('connected to mongo db');
      this.addTestUser();
    });
    return mongoose.connection;
  };

  addTestUser = async (): Promise<void> => {
    testUsers.forEach(async (user) => {
      await user.save((error: Error) => {
        if (error) return;
        this.addUserToContactList(user.id, user.id);
      });
    });
  };

  saveParcelToUserMessages = (parcel: DirectMessageParcel, senderId: string, receiverId: string): void => {
    this.user.findById(senderId, (error: Error, user) => {
      if (error) return logger.error(error);
      this.user.updateOne(
        { _id: senderId },
        { $set: { messages: addParcelToMessages(user.messages, parcel, receiverId) } },
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

  updateUser = async (userId: string, fields: UpdatableUserData): Promise<Record<string, UserData>> => {
    await this.user.updateOne(
      { _id: userId },
      { $set: fields },
    );
    const data = await this.user.findById(userId);
    return { user: toUserData(data) };
  };

  markMessageAsRead = async (senderId: string, receiverId: string, messageId: string): Promise<Document & any> => {
    const targetMessage = `messages.${receiverId}.id`;
    const targetField = `messages.${receiverId}.$.read`;
    return this.user.findOneAndUpdate(
      { _id: senderId, [targetMessage]: messageId },
      { $set: { [targetField]: true } },
    );
  };

  addUserToContactList = async (userId: string, userIdToAdd: string): Promise<Record<string, UserData>> => {
    const user = await this.user.findById(userId);
    if (!user.contacts.includes(userIdToAdd)) {
      await this.user.updateOne(
        { _id: userId },
        { $set: { contacts: [...user.contacts, userIdToAdd] } },
      );
      await this.user.updateOne(
        { _id: userIdToAdd },
        { $set: { inContactListOf: [...user.inContactListOf, userId] } },
      );
    }
    return { contact: toUserData(user) };
  };

  removeUserFromContactList = async (userId: string, userIdToRemove: string): Promise<Record<string, any>> => {
    const user = await this.user.findById(userId);
    await this.user.updateOne(
      { _id: userId },
      { $set: { contacts: user.contacts.filter((contact: string) => contact !== userIdToRemove) } },
    );
    await this.user.updateOne(
      { _id: userIdToRemove },
      { $set: { inContactListOf: user.inContactListOf.filter((contact: string) => contact !== userId) } },
    );
    return {};
  };

  findUserById = async (id: string): Promise<Record<string, UserData>> => {
    const user = await this.user.findById(id);
    return { user: toUserData(user) };
  };

  findUsersBy = async (query: MongoRegexQuery): Promise<Record<string, UserData[]>> => {
    const users = await this.user.find(query) || [];
    return { users: users.map(toUserData) };
  };

  getUserFieldData = async (userId: string, field: string): Promise<any> => {
    const data = await this.user.findById(userId);
    return data[field];
  };

  getUserMessages = async (userId: string): Promise<Messages> => (
    this.getUserFieldData(userId, 'messages')
  );

  getUserContacts = async (userId: string): Promise<string[]> => (
    this.getUserFieldData(userId, 'contacts')
  );

  getUserLanguage = async (userId: string): Promise<string> => (
    this.getUserFieldData(userId, 'language')
  );

  getUsersById = async (userIds: string[]): Promise<MongooseUser[]> => {
    const users = await this.user.find({
      _id: { $in: userIds.map((id) => mongoose.Types.ObjectId(id)) },
    });
    return users;
  };
}

const repository = new Repository(User);

export { repository, Repository };

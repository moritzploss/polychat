import * as R from 'ramda';
import { Request, Response } from 'express-serve-static-core';
import { repository } from '../services/repository';

import { parcelService } from '../services/parcelService';
import { toUserData, getUpdatableFields } from './login';
import { logger } from '../logging';
import { MongooseUser } from '../types/backend';
import { toMongoRegexQuery } from '../util/mongo';

const safely = <T extends (...args: any[]) => any>(func: T): T => (
  ((async (...args: any[]) => {
    try {
      return await func(...args);
    } catch (error) {
      logger.error(error);
      return { error: error.message };
    }
  }) as T)
);

const getUser = async (req: Request, res: Response): Promise<Response<JSON>> => {
  const user = await repository.findUserById(req.params.userId);
  return res.json(toUserData(user));
};

const getUsers = async (req: Request, res: Response): Promise<Response<JSON>> => {
  const mongoQuery = toMongoRegexQuery(req.query);
  const { error, users } = await safely(repository.findUsersBy)(mongoQuery);
  const returnData = error
    ? { error }
    : users.map(toUserData);
  return res.json(returnData);
};

const addContact = (req: Request, res: Response): void => {
  const { contactId } = req.body;
  repository.addUserToContactList(req.params.userId, contactId, () => {
    parcelService.deliverContactListParcel(req.params.userId);
    res.json({});
  });
};

const deleteContact = (req: Request, res: Response): void => {
  repository.removeUserFromContactList(req.params.userId, req.params.contactId, () => {
    parcelService.deliverContactListParcel(req.params.userId);
    res.json({});
  });
};

const updateUser = (req: Request, res: Response): Response<JSON> | void => {
  const validRequestedUpdates = getUpdatableFields(req.body);
  if (R.isEmpty(validRequestedUpdates)) {
    return res.status(400).json({ error: 'no valid fields found' });
  }

  const callback = (error: Error, user: MongooseUser): Response<JSON> => {
    if (error) {
      logger.error(error);
      return res.status(500).json({ error: 'an error occured' });
    }
    parcelService.broadcastContactListUpdateToUserContacts(req.params.userId);
    return res.json(toUserData({
      ...toUserData(user),
      ...validRequestedUpdates,
    }));
  };

  return repository.updateUser(callback, req.params.userId, req.body);
};

export {
  getUsers,
  addContact,
  deleteContact,
  updateUser,
  getUser,
};

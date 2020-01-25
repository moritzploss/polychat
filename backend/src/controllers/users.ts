import { Request, Response } from 'express-serve-static-core';
import * as R from 'ramda';
import { repository } from '../services/repository';

import { parcelService } from '../services/parcelService';
import { toCredentials } from './login';
import { logger } from '../logging';
import { MongooseUser } from '../types/backend';
import { queryParamsToMongoRegexQuery } from '../util/mongo';

const getUser = async (req: Request, res: Response): Promise<Response<JSON>> => {
  const user = await repository.findUserById(req.params.id);
  return res.json(toCredentials(user));
};

const getUsers = async (req: Request, res: Response): Promise<Response<JSON>> => {
  const mongoQuery = queryParamsToMongoRegexQuery(req.query);
  const users = await repository.findUsersBy(mongoQuery);
  const userData = R.isEmpty(users)
    ? []
    : users.map(toCredentials);
  return res.json(userData);
};

const addContact = (req: Request, res: Response): void => {
  const { userId, userToAdd } = req.body;
  repository.addUserToContactList(userId, userToAdd, () => {
    parcelService.deliverContactListParcel(userId);
    res.json({});
  });
};

const removeContact = (req: Request, res: Response): void => {
  const { userId, userToRemove } = req.body;
  repository.removeUserFromContactList(userId, userToRemove, () => {
    parcelService.deliverContactListParcel(userId);
    res.json({});
  });
};

const updateUser = (req: Request, res: Response): Response<JSON> | void => {
  if (R.isEmpty(toCredentials(req.body))) {
    return res.status(400).json({ error: 'no valid fields found' });
  }

  const callback = (error: Error, user: MongooseUser): Response<JSON> => {
    if (error) {
      logger.error(error);
      return res.status(500).json({ error: 'an error occured' });
    }
    parcelService.broadcastContactListUpdateToUserContacts(req.params.id);
    return res.json(toCredentials({
      ...toCredentials(user),
      ...req.body,
    }));
  };

  return repository.updateUser(callback, req.params.id, req.body);
};

export {
  getUsers,
  addContact,
  removeContact,
  updateUser,
  getUser,
};

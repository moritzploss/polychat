import { Request, Response } from 'express-serve-static-core';
import * as R from 'ramda';
import { repository } from '../services/repository';

import { parcelService } from '../services/parcelService';
import { toCredentials } from './login';
import { logger } from '../logging';
import { MongooseUser } from '../types/backend';

const findUsers = async (req: Request, res: Response): Promise<Response<JSON>> => {
  const { query, field } = req.body;
  const users = await repository.findUsersBy(field, query);
  const result = R.isEmpty(users)
    ? []
    : users.map(toCredentials);
  return res.json({ result });
};

const addUserToContactList = (req: Request, res: Response): void => {
  const { userId, userToAdd } = req.body;
  repository.addUserToContactList(userId, userToAdd, () => {
    parcelService.deliverContactListParcel(userId);
    res.json({});
  });
};

const removeUserFromContactList = (req: Request, res: Response): void => {
  const { userId, userToRemove } = req.body;
  repository.removeUserFromContactList(userId, userToRemove, () => {
    parcelService.deliverContactListParcel(userId);
    res.json({});
  });
};

const updateUserData = (req: Request, res: Response): Response<JSON> | void => {
  const { userId, ...fieldsToUpdate } = req.body;

  if (R.isEmpty(toCredentials(fieldsToUpdate))) {
    return res.status(400).json({ error: 'no valid fields found' });
  }

  const callback = (error: Error, user: MongooseUser): Response<JSON> => {
    if (error) {
      logger.error(error);
      return res.status(500).json({ error: 'an error occured' });
    }
    parcelService.broadcastContactListUpdateToUserContacts(userId);
    return res.json(toCredentials({
      ...toCredentials(user),
      ...fieldsToUpdate,
    }));
  };

  return repository.updateUser(callback, userId, fieldsToUpdate);
};

export {
  findUsers,
  addUserToContactList,
  removeUserFromContactList,
  updateUserData,
};

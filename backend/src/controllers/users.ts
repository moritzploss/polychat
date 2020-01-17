import { Request, Response } from 'express-serve-static-core';
import * as R from 'ramda';
import { repository } from '../services/repository';

import { parcelService } from '../services/parcelService';
import { toCredentials } from './login';
import { logger } from '../logging';

const findUsers = (req: Request, res: Response): void => {
  const { query } = req.body;
  repository.findUsersByName(query, (error: Error, data) => (
    (error)
      ? res.json({ result: [] })
      : res.json({ result: data.map(toCredentials) })
  ));
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

const updateUserData = (req: Request, res: Response): Response<any> | void => {
  const { userId, ...fieldsToUpdate } = req.body;

  if (R.isEmpty(toCredentials(fieldsToUpdate))) {
    return res.status(400).json({ error: 'no valid fields found' });
  }

  const callback = (error: Error, user: any): Response<JSON> => {
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

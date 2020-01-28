import { Request, Response } from 'express-serve-static-core';
import * as R from 'ramda';
import { repository } from '../services/repository';

import { parcelService } from '../services/parcelService';
import { toUserData } from './login';
import { logger } from '../logging';
import { MongooseUser } from '../types/backend';
import { queryParamsToMongoRegexQuery } from '../util/mongo';

const getUser = async (req: Request, res: Response): Promise<Response<JSON>> => {
  const user = await repository.findUserById(req.params.userId);
  return res.json(toUserData(user));
};

const getUsers = async (req: Request, res: Response): Promise<Response<JSON>> => {
  const mongoQuery = queryParamsToMongoRegexQuery(req.query);
  const users = await repository.findUsersBy(mongoQuery);
  const userData = R.isEmpty(users)
    ? []
    : users.map(toUserData);
  return res.json(userData);
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
  if (R.isEmpty(toUserData(req.body))) {
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
      ...req.body,
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

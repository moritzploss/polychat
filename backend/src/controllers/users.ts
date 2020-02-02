import * as R from 'ramda';
import { Request, Response, NextFunction } from 'express-serve-static-core';

import { JsonOrNext } from '../types/backend';
import { repository } from '../services/repository';
import { parcelService } from '../services/parcelService';
import { getUpdatableFields } from './login';
import { toMongoRegexQuery } from '../util/mongo';
import { safely } from '../util/safeAsyncFunctions';

const getUser = async (req: Request, res: Response, next: NextFunction): Promise<JsonOrNext> => {
  const { user, error } = await safely(repository.findUserById)(req.params.userId);
  return (error)
    ? next(error)
    : res.json(user);
};

const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<JsonOrNext> => {
  const mongoQuery = toMongoRegexQuery(req.query);
  const { users, error } = await safely(repository.findUsersBy)(mongoQuery);
  return (error)
    ? next(error)
    : res.json(users);
};

const addContact = async (req: Request, res: Response, next: NextFunction): Promise<JsonOrNext> => {
  try {
    const contact = await repository.addUserToContactList(req.params.userId, req.body.contactId);
    parcelService.deliverContactListParcel(req.params.userId);
    return res.json(contact);
  } catch (error) {
    return next(error);
  }
};

const deleteContact = async (req: Request, res: Response, next: NextFunction): Promise<JsonOrNext> => {
  try {
    await repository.removeUserFromContactList(req.params.userId, req.params.contactId);
    parcelService.deliverContactListParcel(req.params.userId);
    return res.json({});
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<JsonOrNext> => {
  const requestedUpdates = getUpdatableFields(req.body);
  if (R.isEmpty(requestedUpdates)) {
    return res
      .status(400)
      .json({ error: 'no valid fields found' });
  }
  try {
    const user = await repository.updateUser(req.params.userId, requestedUpdates);
    parcelService.broadcastContactListUpdateToUserContacts(req.params.userId);
    return res.json(user);
  } catch (error) {
    return next(error);
  }
};

export {
  getUsers,
  addContact,
  deleteContact,
  updateUser,
  getUser,
};

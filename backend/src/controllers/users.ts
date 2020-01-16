import { Request, Response } from 'express-serve-static-core';
import { repository } from '../services/repository';
import { parcelService } from '../services/parcelService';
import { toCredentials } from './login';

const updateUser = (req: Request, res: Response): void => {
  const { userId, ...fieldsToUpdate } = req.body;
  repository.updateUser(
    () => res.json({}),
    userId,
    fieldsToUpdate,
  );
  parcelService.broadcastContactListUpdateToUserContacts(userId);
};

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
  const { userId, userToAdd } = req.body;
  repository.removeUserFromContactList(userId, userToAdd, () => {
    parcelService.deliverContactListParcel(userId);
    res.json({});
  });
};

export { findUsers, addUserToContactList, removeUserFromContactList, updateUser };

import { Request, Response } from 'express-serve-static-core';
import { repository } from '../services/repository';
import { parcelService } from '../services/parcelService';
import { toCredentials } from './login';

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

export { findUsers, addUserToContactList };
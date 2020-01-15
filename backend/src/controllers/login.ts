import { Request, Response } from 'express-serve-static-core';
import { MongooseDocument } from 'mongoose';

import { UserData } from '../types/applicationWide';
import { User } from '../schemas/user';

const toCredentials = (userData): UserData => ({
  name: userData.name,
  language: userData.language,
  email: userData.email,
  id: userData.id,
  avatar: userData.avatar,
});

const loginUser = async (req: Request, res: Response): Promise<void> => {
  await User.authenticate(req.body.email, req.body.password, (error: Error, userData: MongooseDocument) => (
    (error || !userData)
      ? res.status(401).json({ error: 'wrong email or password' })
      : res.json(toCredentials(userData))
  ));
};

export { loginUser, toCredentials };

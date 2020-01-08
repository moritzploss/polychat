import { Request, Response } from 'express-serve-static-core';
import { MongooseDocument } from 'mongoose';

import { UserCredentials } from '../types';

import { User } from '../schemas/user';

const toCredentials = (userData): UserCredentials => ({
  name: userData.name,
  language: userData.language,
  email: userData.email,
  id: userData.id,
});

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  await User.authenticate(email, password, (error: Error, userData: MongooseDocument) => (
    (error || !userData)
      ? res.status(401).json({ error: 'wrong email or password' })
      : res.json(toCredentials(userData))
  ));
};

export { loginUser };

import { Request, Response } from 'express-serve-static-core';

import { UserData } from '../types/applicationWide';
import { User } from '../schemas/user';
import { UpdatableUserData } from '../types/backend';

const toUserData = (userData: Record<string, any>): UserData => ({
  name: userData.name,
  language: userData.language,
  email: userData.email,
  id: userData.id,
  avatar: userData.avatar,
});

const getUpdatableFields = (userData: Record<string, any>): UpdatableUserData => ({
  ...(userData.name) && { name: userData.name },
  ...(userData.avatar) && { avatar: userData.avatar },
  ...(userData.language) && { language: userData.language },
});

const loginUser = async (req: Request, res: Response): Promise<void> => {
  await User.authenticate(req.body.email, req.body.password, (error: Error, user) => {
    if (error || !user) {
      return res
        .status(401)
        .json({ error: 'wrong email or password' });
    }

    req.session.authorized = true;
    req.session.userId = user.id;

    return res.json(toUserData(user));
  });
};

export { loginUser, toUserData, getUpdatableFields };

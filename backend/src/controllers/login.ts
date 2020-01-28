import { Request, Response } from 'express-serve-static-core';

import { UserData } from '../types/applicationWide';
import { User } from '../schemas/user';

const toUserData = (userData): UserData => ({
  name: userData.name,
  language: userData.language,
  email: userData.email,
  id: userData.id,
  avatar: userData.avatar,
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

export { loginUser, toUserData };

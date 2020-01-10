import { Request, Response } from 'express-serve-static-core';

import { User } from '../schemas/user';
import { toCredentials } from './login';

const authenticateRequest = async (req: Request, res: Response): Promise<void> => {
  await User.authenticate(req.body.email, req.body.password, (error: Error, user) => {
    if (error || !user) {
      return res
        .status(401)
        .json({ error: 'wrong email or password' });
    }

    req.session.authorized = true;
    req.session.userId = user.id;

    return res.json(toCredentials(user));
  });
};

export { authenticateRequest };

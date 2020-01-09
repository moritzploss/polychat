import { Request, Response } from 'express-serve-static-core';

import { User } from '../schemas/user';
import { logger } from '../logging/index';

const authenticateRequest = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  await User.authenticate(email, password, (error: Error, user) => {
    if (error || !user) {
      return res
        .status(401)
        .json({ error: 'wrong email or password' });
    }

    req.session.authorized = true;

    return res.json({
      name: user.name,
      language: user.language,
      email: user.email,
      id: user.id,
    });
  });
};

export { authenticateRequest };

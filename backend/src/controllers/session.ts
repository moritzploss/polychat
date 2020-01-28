import { Request, Response } from 'express-serve-static-core';

import { logger } from '../logging/index';

const validateSession = (req: Request, res: Response): void => {
  const status = req.session.authorized ? 200 : 401;
  res.status(status).send();
};

const deleteSession = (req: Request, res: Response): void => (
  req.session.destroy((error: Error) => {
    if (error) {
      logger.error(error);
      res.status(500);
    }
    res.send();
  })
);

export { validateSession, deleteSession };

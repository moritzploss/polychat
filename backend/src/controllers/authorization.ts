import { Request, Response, NextFunction } from 'express-serve-static-core';

const authorizeOrReject = (req: Request, res: Response, next: NextFunction): void | Response<JSON> => (
  (req.session.authorized && (req.session.userId === req.params.userId))
    ? next()
    : res.status(401).json({ error: 'unauthorized' })
);

export { authorizeOrReject };

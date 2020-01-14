import { Request, Response, NextFunction } from 'express-serve-static-core';
import { repository } from '../services/repository';
import { toCredentials } from './login';

const findUsers = (req: Request, res: Response): void => {
  const { query } = req.body;
  repository.findUsersByName(query, (error: Error, data) => (
    (error)
      ? res.json({ result: [] })
      : res.json({ result: data.map(toCredentials) })
  ));
};

export { findUsers };

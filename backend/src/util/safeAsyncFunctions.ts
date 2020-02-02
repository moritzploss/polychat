import { Response } from 'express-serve-static-core';

import { logger } from '../logging/index';
import { SafelyError } from '../types/backend';

const safely = <T extends (...args: any[]) => any>(func: T): T => (
  (async (...args: Parameters<T>): Promise<ReturnType<T> | SafelyError> => {
    try {
      return await func(...args);
    } catch (error) {
      logger.error(error);
      return { error: error.message };
    }
  }) as T
);

const dataOrServerError = (res: Response, data: Record<string, any>, error: any): Response<JSON> => (
  (error)
    ? res.status(500).json({ error })
    : res.json(data)
);

export {
  safely,
  dataOrServerError,
};

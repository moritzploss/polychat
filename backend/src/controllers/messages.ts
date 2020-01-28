import { Request, Response } from 'express-serve-static-core';
import { repository } from '../services/repository';
import { logger } from '../logging';

const updateMessage = async (req: Request, res: Response): Promise<Response<JSON>> => {
  const { userId, contactId, messageId } = req.params;
  try {
    // TODO: allow for general update operations
    await repository.markMessageAsRead(userId, contactId, messageId);
    await repository.markMessageAsRead(contactId, userId, messageId);
    return res.json({});
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error });
  }
};

export {
  updateMessage,
};

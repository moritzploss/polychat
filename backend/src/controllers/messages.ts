import { Request, Response } from 'express-serve-static-core';
import { repository } from '../services/repository';

const setReadStatus = async (req: Request, res: Response): Promise<Response<JSON>> => {
  const { senderId, receiverId, messageId } = req.body;
  await repository.updateMessageStatus(senderId, receiverId, messageId);
  return res.json({});
};

export {
  setReadStatus,
};

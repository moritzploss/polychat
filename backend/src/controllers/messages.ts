import { Request, Response } from 'express-serve-static-core';
import { repository } from '../services/repository';

const setReadStatus = async (req: Request, res: Response): Promise<Response<JSON>> => {
  const { senderId, receiverId } = req.body;
  await repository.setMessagesToRead(senderId, receiverId);
  await repository.setMessagesToRead(receiverId, senderId);
  return res.json({});
};

export {
  setReadStatus,
};

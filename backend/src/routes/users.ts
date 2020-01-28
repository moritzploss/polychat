import * as express from 'express';

import { updateMessage } from '../controllers/messages';
import {
  getUsers, addContact, deleteContact, updateUser, getUser,
} from '../controllers/users';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);
userRouter.put('/:userId', updateUser);

userRouter.post('/:userId/contacts', addContact);
userRouter.delete('/:userId/contacts/:contactId', deleteContact);

userRouter.put('/:userId/messages/:contactId/:messageId', updateMessage);

export { userRouter };

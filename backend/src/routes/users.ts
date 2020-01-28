import * as express from 'express';

import { updateMessage } from '../controllers/messages';
import { authorizeOrReject } from '../controllers/authorization';
import {
  getUsers, addContact, deleteContact, updateUser, getUser,
} from '../controllers/users';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', authorizeOrReject, getUser);
userRouter.put('/:userId', authorizeOrReject, updateUser);

userRouter.post('/:userId/contacts', authorizeOrReject, addContact);
userRouter.delete('/:userId/contacts/:contactId', authorizeOrReject, deleteContact);

userRouter.put('/:userId/messages/:contactId/:messageId', authorizeOrReject, updateMessage);

export { userRouter };

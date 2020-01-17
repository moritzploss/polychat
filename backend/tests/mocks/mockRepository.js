/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { mockUser } from './mockUser';

const mockRepository = {
  user: mockUser,
  connectDatabase: () => { },
  addTestUser: () => { },
  saveParcelToUserMessages: () => { },
  saveDirectMessage: () => { },
  updateUser: () => { },
  addUserToContactList: () => { },
  removeUserFromContactList: () => { },
  findUsersByName: () => { },
  getUserFieldData: () => { },
  getUserMessages: () => { },
  getUserContacts: () => { },
  getUserLanguage: () => { },
  getUsersById: () => { },
};

export default {
  mockRepository,
};

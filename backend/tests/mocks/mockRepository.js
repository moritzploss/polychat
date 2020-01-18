/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const { mockUser } = require('./mockUser');

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

module.exports = {
  mockRepository,
};

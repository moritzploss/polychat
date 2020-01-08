import { UserData } from '../types';

const userReducer = (user = {}, action: any): UserData => {
  switch (action.type) {
    case 'ADD':
      return action.userData;
    case 'REMOVE':
      return {};
    default:
      return user;
  }
};

export { userReducer };

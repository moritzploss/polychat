import { UserData, Action } from '../types';

const addUser = (userData: UserData): { type: string; userData: UserData } => ({
  type: 'ADD',
  userData,
});

const removeUser = (): Action => ({ type: 'REMOVE' });

export { addUser, removeUser };

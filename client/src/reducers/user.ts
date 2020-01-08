interface Action {
  type: string;
  userData?: {
    name: string;
  };
}

const addUser = (userData: any) => ({
  type: 'ADD',
  userData,
});

const removeUser = () => ({ type: 'REMOVE' });

const userReducer = (user = {}, action: any) => {
  switch (action.type) {
    case 'ADD':
      return action.userData;
    case 'REMOVE':
      return {};
    default:
      return user;
  }
};

export { userReducer, addUser, removeUser };

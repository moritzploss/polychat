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

const user = (user = {}, action: any) => {
  switch (action.type) {
    case 'ADD':
      return action.userData ;
    case 'REMOVE':
      return {};
    default:
      return user;
  }
};

export { user, addUser, removeUser };

import React from 'react';
import { connect } from 'react-redux';

import { addUser, removeUser } from '../reducers/user';

const Login: React.FC = ({ addUser }: any) => {
  return (
    <>
      <h1>
        Login
      </h1>
      <button type="button" onClick={(): void => addUser({ name: 'Test User' })}>Login</button>
    </>
  );
};

const mapStateToProps = ({user}: any) => ({ user });

export default connect(mapStateToProps, { addUser, removeUser })(Login);

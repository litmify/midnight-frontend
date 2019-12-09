import * as React from 'react';
import LoginField from './LoginField/LoginField';
import Navigation from '../../base/navigation/Navigation';

const Login = function() {
  return (
    <div className="Login">
      <Navigation />
      <LoginField />
    </div>
  );
};

export default Login;

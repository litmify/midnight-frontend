import * as React from 'react';
import Navigation from '../../base/navigation/Navigation';
import LoginField from './LoginField';

const Login = function() {
  return (
    <div className="Login">
      <Navigation />
      <LoginField />
    </div>
  );
};

export default Login;

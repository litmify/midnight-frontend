import * as React from 'react';
import Navigation from '../../base/navigation/Navigation';
import RegisterField from './RegisterField/RegisterField';

const Register = function() {
  return (
    <div className="Register">
      <Navigation />
      <RegisterField />
    </div>
  );
};

export default Register;

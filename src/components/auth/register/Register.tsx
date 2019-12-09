import * as React from 'react';
import RegisterField from './RegisterField/RegisterField';
import Navigation from '../../base/navigation/Navigation';

const Register = function() {
  return (
    <div className="Register">
      <Navigation />
      <RegisterField />
    </div>
  );
};

export default Register;

import * as React from 'react';
import './RegisterField.scss';

import RegisterFieldEmail from './RegisterFieldEmail';
import RegisterFieldCode from './RegisterFieldCode';

const RegisterField = function() {
  const [email, setEmail] = React.useState('');
  const [process, setProcess] = React.useState(1);

  return (
    <section className="register__section hero is-fullheight-with-navbar">
      <div className="register__container hero-body container has-text-centered">
        <div className="register__card card">
          <div className="card-content">
            <div className="register__content">
              <p className="register__header">회원가입</p>
              {process === 1 ? (
                <RegisterFieldEmail email={email} setEmail={setEmail} setProcess={setProcess} />
              ) : process === 2 ? (
                <RegisterFieldCode email={email} />
              ) : null}
              <hr />
              <a className="register__a" href="/auth/login">
                이미 계정이 있습니까?
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterField;

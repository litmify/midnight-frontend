import * as React from 'react';
import './LoginField.scss';

import LoginFieldEmail from '../LoginFieldEmail/LoginFieldEmail';
import LoginFieldCode from '../LoginFieldCode/LoginFieldCode';

const LoginField = function() {
  const [email, setEmail] = React.useState('');
  const [process, setProcess] = React.useState(1);

  return (
    <section className="login__section hero is-fullheight-with-navbar">
      <div className="login__container hero-body container has-text-centered">
        <div className="login__card card">
          <div className="card-content">
            <div className="login__content">
              <p className="login__header">로그인</p>
              {process === 1 ? (
                <LoginFieldEmail email={email} setEmail={setEmail} setProcess={setProcess} />
              ) : process === 2 ? (
                <LoginFieldCode email={email} />
              ) : null}
              <hr />
              <a className="login__a" href="/auth/register">
                계정이 없습니까?
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginField;

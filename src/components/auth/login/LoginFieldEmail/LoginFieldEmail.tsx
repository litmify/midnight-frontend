import * as React from 'react';
import axios from 'axios';

import './LoginFieldEmail.scss';

type Props = {
  email: string;
  setEmail: any;
  setProcess: any;
};

const LoginFieldEmail = function({ email, setEmail, setProcess }: Props) {
  const [isMailSending, setIsMailSending] = React.useState(false);
  const [isErrorOnMailSending, setIsErrorOnMailSending] = React.useState(false);
  const [mailErrorMessage, setMailErrorMessage] = React.useState('');

  const handleEmail = function(e: any) {
    setEmail(e.target.value);
    setIsErrorOnMailSending(false);
  };

  const tryLogin = async function(this: any) {
    // Prepairing sending login code email
    setIsMailSending(true);
    setIsErrorOnMailSending(false);

    await axios
      .post(process.env.REACT_APP_API_URL + 'auth/login', {
        email,
      })
      .then(data => {
        if (data.data.result) {
          setProcess(2);
        }
      })
      .catch(err => {
        setIsMailSending(false);
        setIsErrorOnMailSending(true);
        
        if (err.response.status === 400) {
          setMailErrorMessage('존재하지 않는 이메일입니다.');
        } else {
          setMailErrorMessage(`예상치 못한 문제가 발생했습니다. 다시 시도해주세요.`);
        }
      });
  };

  return (
    <div className="login__content--before">
      <p className="login__description">로그인하려면 이메일 주소를 입력하세요.</p>
      <input
        className="login__input input"
        type="email"
        placeholder="이메일"
        disabled={isMailSending}
        onChange={handleEmail}
        value={email}
      />
      {isErrorOnMailSending ? (
        <p className="login__description--error has-text-danger">{mailErrorMessage}</p>
      ) : null}
      {!isMailSending ? (
        <button onClick={tryLogin} className="login__button button is-fullwidth is-dark">
          계속하기
        </button>
      ) : (
        <button disabled={true} className="login__button button is-fullwidth is-dark is-loading">
          계속하기
        </button>
      )}
    </div>
  );
};

export default LoginFieldEmail;

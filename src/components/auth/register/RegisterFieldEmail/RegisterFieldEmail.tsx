import * as React from 'react';
import * as joi from 'joi';
import axios from 'axios';

import './RegisterFieldEmail.scss';

type Props = {
  email: string;
  setEmail: any;
  setProcess: any;
};

const RegisterFieldEmail = function({ email, setEmail, setProcess }: Props) {
  const [username, setUsername] = React.useState('');
  const [isRegisterPending, setIsRegisterPending] = React.useState(false);
  const [isErrorOnRegisterPending, setIsErrorOnRegisterPending] = React.useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = React.useState('');

  const handleEmail = function(e: any) {
    setEmail(e.target.value);
    setIsErrorOnRegisterPending(false);
  };

  const handleUsername = function(e: any) {
    setUsername(e.target.value);
    setIsErrorOnRegisterPending(false);
  };

  const tryRegister = async function(this: any) {
    // Prepairing sending register code email
    setIsRegisterPending(true);
    setIsErrorOnRegisterPending(false);

    // Temporary client-side validation
    const joiObject = joi.object({
      email: joi
        .string()
        .email()
        .required(),
      username: joi
        .string()
        .alphanum()
        .max(32)
        .min(2)
        .required(),
    });
    const joiObjectValidateResult = joi.validate({ email, username }, joiObject);
    if (joiObjectValidateResult.error) {
      setIsRegisterPending(false);
      setIsErrorOnRegisterPending(true);

      // Validation failed
      const err = joiObjectValidateResult.error.details[0];
      if (err.path[0] === 'email') {
        if (err.type === 'any.empty') setRegisterErrorMessage('이메일 주소를 입력해주세요.');
        else if (err.type === 'string.email')
          setRegisterErrorMessage('올바른 이메일 주소를 입력해주세요.');
      } else if (err.path[0] === 'username') {
        if (err.type === 'any.empty') setRegisterErrorMessage('사용자명을 입력해주세요.');
        else if (err.type === 'string.min' || err.type === 'string.max')
          setRegisterErrorMessage('사용자명은 2자 이상 32자 이내여야 합니다.');
        else if (err.type === 'string.alphanum')
          setRegisterErrorMessage('사용자명은 영어와 숫자만 사용할 수 있습니다.');
      } else {
        setRegisterErrorMessage(
          '예상치 못한 에러가 발생했습니다. 브라우저 종료 후 다시 시도해주세요.',
        );
      }

      return;
    }

    // Server request
    await axios
      .post(process.env.REACT_APP_API_URL + 'auth/register', {
        email,
        username,
      })
      .then(data => {
        if (data.data.result) {
          setProcess(2);
        }
      })
      .catch(err => {
        setIsRegisterPending(false);
        setIsErrorOnRegisterPending(true);

        if (err.response.status === 400) {
          setRegisterErrorMessage('올바른 요청이 아닙니다.');
        } else if (err.response.status === 409) {
          if (err.response.data.payload === 'email') {
            setRegisterErrorMessage('이메일 주소가 이미 사용중입니다.');
          } else if (err.response.data.payload === 'username') {
            setRegisterErrorMessage('사용자명이 이미 사용중입니다.');
          } else {
            setRegisterErrorMessage(`예상치 못한 문제가 발생했습니다. 다시 시도해주세요.`);
          }
        } else {
          setRegisterErrorMessage(`예상치 못한 문제가 발생했습니다. 다시 시도해주세요.`);
        }
      });
  };

  return (
    <div className="register__content--before">
      <p className="register__description">사용할 이메일 주소와 사용자명을 입력하세요.</p>
      <input
        className="register__input input"
        type="email"
        placeholder="이메일"
        disabled={isRegisterPending}
        onChange={handleEmail}
        value={email}
      />
      <input
        className="register__input input"
        type="text"
        placeholder="사용자명"
        disabled={isRegisterPending}
        onChange={handleUsername}
        value={username}
        style={{ marginTop: '0.5rem' }}
      />
      {isErrorOnRegisterPending ? (
        <p className="register__description--error has-text-danger">{registerErrorMessage}</p>
      ) : null}
      {!isRegisterPending ? (
        <button onClick={tryRegister} className="register__button button is-fullwidth is-dark">
          계속하기
        </button>
      ) : (
        <button disabled={true} className="register__button button is-fullwidth is-dark is-loading">
          계속하기
        </button>
      )}
    </div>
  );
};

export default RegisterFieldEmail;

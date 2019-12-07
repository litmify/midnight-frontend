import * as React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './LoginField.scss';

type Props = {
  email: string;
};

const LoginFieldCode = function({ email }: Props) {
  const history = useHistory();

  const [loginCode, setLoginCode] = React.useState('');
  const [isLoginCodeValidating, setIsLoginCodeValidating] = React.useState(false);
  const [isErrorOnLoginCodeValidation, setIsErrorOnLoginCodeValidation] = React.useState(false);
  const [codeErrorMessage, setCodeErrorMessage] = React.useState('');

  const handleLoginCodeChange = (e: any) => {
    setLoginCode(e.target.value);
    setIsErrorOnLoginCodeValidation(false);
  };

  const tryLoginCode = async function(this: any) {
    setIsLoginCodeValidating(true);
    setIsErrorOnLoginCodeValidation(false);

    return await axios
      .post(process.env.REACT_APP_API_URL + 'auth/login/validate', {
        email,
        code: loginCode,
      })
      .then(data => {
        if (data.data.result) {
          try {
            localStorage.setItem('user', data.data.payload.token);
            history.push('/');
          } catch (err) {
            setCodeErrorMessage(`올바른 접속이 아닙니다. 브라우저를 종료 후 다시 시도해주세요.`);
            setIsLoginCodeValidating(false);
            setIsErrorOnLoginCodeValidation(true);
          }
        }
      })
      .catch(err => {
        setIsLoginCodeValidating(false);
        setIsErrorOnLoginCodeValidation(true);
        
        if (err.response.status === 400) {
          setCodeErrorMessage('올바른 로그인 코드가 아닙니다.');
        } else {
          setCodeErrorMessage(`예상치 못한 문제가 발생했습니다. 다시 시도해주세요.`);
        }
      });
  };

  return (
    <div className="login__content--after">
      <p className="login__description">
        메일로 인증 코드를 전송하였습니다. 인증 코드를 입력해주세요. 인증 코드는 30분 뒤 만료됩니다.
      </p>
      <input
        className="login__input input"
        type="text"
        placeholder="인증 코드를 입력하세요."
        onChange={handleLoginCodeChange}
        value={loginCode}
      />
      {isErrorOnLoginCodeValidation ? (
        <p className="login__description--error has-text-danger">{codeErrorMessage}</p>
      ) : null}
      {!isLoginCodeValidating ? (
        <button onClick={tryLoginCode} className="login__button button is-fullwidth is-dark">
          확인
        </button>
      ) : (
        <button disabled={true} className="login__button button is-fullwidth is-dark is-loading">
          확인
        </button>
      )}
      <a href="/auth/login" className="login__button button is-fullwidth is-light">
        돌아가기
      </a>
    </div>
  );
};

export default LoginFieldCode;

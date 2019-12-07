import * as React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './RegisterField.scss';

type Props = {
  email: string;
};

const RegisterFieldCode = function({ email }: Props) {
  const history = useHistory();

  const [registerCode, setRegisterCode] = React.useState('');
  const [isRegisterCodeValidating, setIsRegisterCodeValidating] = React.useState(false);
  const [isErrorOnRegisterCodeValidation, setIsErrorOnRegisterCodeValidation] = React.useState(
    false,
  );
  const [codeErrorMessage, setCodeErrorMessage] = React.useState('');

  const handleRegisterCodeChange = (e: any) => {
    setRegisterCode(e.target.value);
    setIsErrorOnRegisterCodeValidation(false);
  };

  const tryRegisterCode = async function(this: any) {
    setIsRegisterCodeValidating(true);
    setIsErrorOnRegisterCodeValidation(false);

    return await axios
      .post(process.env.REACT_APP_API_URL + 'auth/register/validate', {
        email,
        code: registerCode,
      })
      .then(data => {
        if (data.data.result) {
          try {
            localStorage.setItem('user', data.data.payload.token);
            alert('회원가입을 완료하였습니다.');
            history.push('/');
          } catch (err) {
            setCodeErrorMessage(`올바른 접속이 아닙니다. 브라우저를 종료 후 다시 시도해주세요.`);
            setIsRegisterCodeValidating(false);
            setIsErrorOnRegisterCodeValidation(true);
          }
        }
      })
      .catch(err => {
        if (err.response.status === 400) {
          setCodeErrorMessage('올바른 로그인 코드가 아닙니다.');
          setIsRegisterCodeValidating(false);
          setIsErrorOnRegisterCodeValidation(true);
        } else {
          setCodeErrorMessage(`예상치 못한 문제가 발생했습니다. 다시 시도해주세요.`);
          setIsRegisterCodeValidating(false);
          setIsErrorOnRegisterCodeValidation(true);
        }
      });
  };

  return (
    <div className="register__content--after">
      <p className="register__description">
        메일로 인증 코드를 전송하였습니다. 인증 코드를 입력해주세요. 인증 코드는 30분 뒤 만료됩니다.
      </p>
      <input
        className="register__input input"
        type="text"
        placeholder="인증 코드를 입력하세요."
        onChange={handleRegisterCodeChange}
        value={registerCode}
      />
      {isErrorOnRegisterCodeValidation ? (
        <p className="register__description--error has-text-danger">{codeErrorMessage}</p>
      ) : null}
      {!isRegisterCodeValidating ? (
        <button onClick={tryRegisterCode} className="register__button button is-fullwidth is-dark">
          확인
        </button>
      ) : (
        <button disabled={true} className="register__button button is-fullwidth is-dark is-loading">
          확인
        </button>
      )}
      <a href="/auth/register" className="register__button button is-fullwidth is-light">
        돌아가기
      </a>
    </div>
  );
};

export default RegisterFieldCode;

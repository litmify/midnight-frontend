import * as React from 'react';
import './Navigation.scss';

const Navigation = function() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem('cilic') !== '' && localStorage.getItem('cilic')) setIsAuthenticated(true);
    else setIsAuthenticated(false);
  });

  return (
    <nav className="navbar__container navbar is-fixed-top container level">
      <div className="navbar__title level-left">
        <a className="navbar__text navbar__text--title level-item" href="/">
          midnight
        </a>
      </div>
      <div className="navbar__content level-right">
        {
          // @ts-ignore
          <div className="navbar__text navbar__text--item level-item button is-white" disabled>
            다운로드
          </div>
        }
        <hr className="navbar__text navbar__text--divider level-item" />
        {isAuthenticated ? (
          <>
            <a
              className="navbar__text navbar__text--item level-item button is-white"
              href="/mypage"
            >
              내 글
            </a>
            <a
              className="navbar__text navbar__text--item level-item button is-white"
              href="/write"
            >
              새 글 쓰기
            </a>
          </>
        ) : (
          <a
            className="navbar__text navbar__text--item level-item button is-white"
            href="/auth/login"
          >
            로그인
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

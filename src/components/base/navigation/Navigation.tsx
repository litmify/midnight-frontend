import * as React from 'react';
import './Navigation.scss';

const Navigation = function() {
  return (
    <nav className="navbar__container navbar is-fixed-top container level">
      <div className="navbar__title level-left">
        <a className="navbar__text navbar__text--title level-item" href="/">midnight</a>
      </div>
      <div className="navbar__content level-right">
        <a className="navbar__text navbar__text--item level-item button is-white" href="/">둘러보기</a>
        {
          // @ts-ignore
          <div className="navbar__text navbar__text--item level-item button is-white" disabled>다운로드</div>
        }
        <hr className="navbar__text navbar__text--divider level-item" />
        <a className="navbar__text navbar__text--item level-item button is-white" href="/auth/login">내 작품</a>
        <a className="navbar__text navbar__text--item level-item button is-white" href="/auth/login">로그인</a>
      </div>
    </nav>
  );
};

export default Navigation;

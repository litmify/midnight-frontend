import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bulma/bulma.sass';
import './index.scss';

import AuthRoute from './components/base/authroute/AuthRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import MPage from './pages/MyPage';
import ReadPage from './pages/ReadPage';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/modules';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route exact path="/">
        <AuthRoute store={store} exact path="/" component={HomePage} />
      </Route>
      <Route exact path="/auth/login" component={LoginPage} />
      <Route exact path="/auth/register" component={RegisterPage} />
      <Route exact path="/write">
        <AuthRoute store={store} exact path="/write" component={WritePage} />
      </Route>
      <Route path="/read/:id">
        <AuthRoute store={store} exact={false} path="/read/:id" component={ReadPage} />
      </Route>
      <Route exact path="/mypage">
        <AuthRoute store={store} exact path="/mypage" component={MPage} />
      </Route>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

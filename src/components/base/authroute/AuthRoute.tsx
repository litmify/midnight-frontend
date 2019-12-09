import React, { useEffect, useRef } from 'react';
import { Route, useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  setAuthUsername,
  setAuthToken,
} from '../../../store/modules/auth';

import './AuthRoute.scss';

type Props = {
  store: any;
  exact: boolean;
  path: string;
  component: any;
};

const AuthRoute = function({ store, exact, path, component }: Props) {
  const loadScreen: any = useRef();
  const history = useHistory();

  const checkAuth = async (store: any) => {
    const token: string = localStorage.getItem('cilic') || '';

    const isLoggedIn = await axios
      .get(process.env.REACT_APP_API_URL + 'auth/check', {
        headers: { cilic: token },
      })
      .then(res => {
        store.dispatch(setAuthToken(token));
        store.dispatch(setAuthUsername(res.data.payload));
        return true;
      })
      .catch(() => {
        store.dispatch(setAuthToken(''));
        store.dispatch(setAuthUsername(''));
        return false;
      });

    if (!isLoggedIn) {
      if (loadScreen.current) loadScreen.current.className = '';
      history.push('/auth/login');
    }
    if (loadScreen.current) loadScreen.current.className = '';
  };

  useEffect(() => {
    checkAuth(store);
  }, []);

  return (
    <>
      {/* using bulma's modal */}
      <div ref={loadScreen} className="modal is-active modal-background loading" />
      <Route exact={exact} path={path} component={component} />
    </>
  );
};

export default AuthRoute;

import * as React from 'react';
import './Home.scss';

import Navigation from '../base/navigation/Navigation';

type Props = {
  children?: React.ReactNode;
};

const Home = function({ children }: Props) {
  return (
    <div className="Home">
      <Navigation />
      <div className="container" style={{ height: '75vh' }}>
        <div className="row justify-content-between align-items-center">
          <div className="col-6">
            <h1 style={{ fontWeight: 400 }}>midnight</h1>
            <h2 style={{ fontWeight: 100 }}>Perfect parterner for writing</h2>
          </div>
          <div className="col-6">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

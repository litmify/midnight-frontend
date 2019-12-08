import * as React from 'react';

import WriteToolbar from './WriteToolbar/WriteToolbar';

const Write = function() {
  return (
    <div className="Write hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <WriteToolbar />
        </div>
      </div>
    </div>
  );
};

export default Write;

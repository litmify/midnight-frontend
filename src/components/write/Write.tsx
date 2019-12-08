import * as React from 'react';

import WriteToolbar from './WriteToolbar/WriteToolbar';
import WriteEditor from './WriteEditor/WriteEditor';

const Write = function() {
  const writeEditor = React.createRef();

  return (
    <div className="Write hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <WriteToolbar writeEditor={writeEditor} />
          <WriteEditor writeEditor={writeEditor} />
        </div>
      </div>
    </div>
  );
};

export default Write;

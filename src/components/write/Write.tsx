import * as React from 'react';

import WriteToolbar from './WriteToolbar/WriteToolbar';
import WriteEditor from './WriteEditor/WriteEditor';
import WriteSidebar from './WriteSidebar/WriteSidebar';

const Write = function() {
  const [quill, setQuill] = React.useState(null);

  return (
    <div className="Write hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <WriteToolbar quill={quill} />
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <WriteEditor setQuill={setQuill} />
            </div>
            <div className="column is-2">
              {/*
              <WriteSidebar quill={quill} />
              */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;

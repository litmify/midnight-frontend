import * as React from 'react';

import WriteToolbar from './WriteToolbar/WriteToolbar';
import WriteEditor from './WriteEditor/WriteEditor';
import WriteSidebar from './WriteSidebar/WriteSidebar';

type Props = {
  isReadMode: boolean;
  title?: string;
  id?: string
};

const Write = function({ isReadMode, title, id }: Props) {
  const [quill, setQuill] = React.useState(null);
  const loadScreen: any = React.useRef();

  React.useEffect(() => {
    setTimeout(() => {
      if (loadScreen.current) loadScreen.current.className = '';
    }, 1000);
  });

  return (
    <div className="Write hero is-fullheight">
      <div
        ref={loadScreen}
        className="modal is-active modal-background"
        style={{ backgroundColor: 'rgb(255, 255, 255)' }}
      >
        <div className="loader-wrapper is-active loader"></div>
      </div>
      <div className="hero-body">
        <div className="container">
          <WriteToolbar quill={quill} isReadMode={isReadMode} titleRead={title} id={id}/>
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <WriteEditor setQuill={setQuill} isReadMode={isReadMode} id={id}/>
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

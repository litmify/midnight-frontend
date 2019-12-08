import * as React from 'react';
import Quill from 'quill';
import './WriteEditor.scss';

type Props = {
  writeEditor: any;
};

const WriteEditor = function({ writeEditor }: Props) {
  const [title, setTitle] = React.useState('');

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
    e.target.style.cssText = 'height: auto; padding: 0;';
    e.target.style.cssText = 'height:' + e.target.scrollHeight + 'px';
  };

  React.useEffect(() => {
    const editor = new Quill('.editor', {
      modules: {
        toolbar: '.toolbar',
      },
      placeholder: '여기에 글을 입력하세요...',
    });
  });

  return (
    <div className="WriteEditor container" style={{ width: '80%' }}>
      <div className="columns">
        <div className="column">
          <div className="toolbar" />
          <div className="editor" ref={writeEditor} />
        </div>
      </div>
    </div>
  );
};

export default WriteEditor;

import * as React from 'react';
import Quill from 'quill';
import './WriteEditor.scss';

type Props = {
  setQuill: any;
};

const WriteEditor = function({ setQuill }: Props) {
  React.useEffect(() => {
    // Setup Quill
    const quill = new Quill('.editor', {
      bounds: '.WriteEditor',
      modules: {
        toolbar: [{ header: [1, 2, 3, false] }, 'bold', 'italic', 'underline', 'strike'],
      },
      placeholder: '본문을 입력하세요.',
      theme: 'bubble',
    });
    setQuill(quill);

    // For Linting
    quill.on('text-change', function(delta, oldDelta, source) {
      console.log(delta);
      console.log(oldDelta);
      console.log(source);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="WriteEditor">
      <div className="toolbar" />
      <div className="editor" />
    </div>
  );
};

export default WriteEditor;

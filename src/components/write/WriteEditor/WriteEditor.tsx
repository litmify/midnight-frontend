import * as React from 'react';
import Quill from 'quill';
import './WriteEditor.scss';
import axios from 'axios';

type Props = {
  setQuill: any;
  isReadMode: boolean;
  id?: string;
};

const WriteEditor = function({ setQuill, isReadMode, id }: Props) {
  React.useEffect(() => {
    // Setup Quill
    const quill = new Quill('.editor', {
      bounds: '.WriteEditor',
      modules: {
        toolbar: [{ header: [1, 2, 3, false] }, 'bold', 'italic', 'underline', 'strike', 'image'],
      },
      placeholder: '본문을 입력하세요.',
      theme: 'bubble',
      readOnly: isReadMode,
    });
    setQuill(quill);

    // For Linting
    quill.on('text-change', function(delta, oldDelta, source) {});

    // I hate to do this but the time is running out
    if (isReadMode) {
      axios.get(process.env.REACT_APP_API_URL + 'post?postId=' + id, {
        headers: { cilic: localStorage.getItem('cilic') },
      }).then(res => {
        quill.setContents(res.data.payload.post.body);
      })
    }
  }, []);

  return (
    <div className="WriteEditor">
      <div className="toolbar" />
      <div className="editor" />
    </div>
  );
};

export default WriteEditor;

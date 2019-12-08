import * as React from 'react';
import './WriteEditor.scss';

type Props = {
  writeEditor: any;
}

const WriteEditor = function({ writeEditor }: Props) {
  const [title, setTitle] = React.useState('');

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
    e.target.style.cssText = 'height: auto; padding: 0;';
    e.target.style.cssText = 'height:' + e.target.scrollHeight + 'px';
  };

  return (
    <div className="WriteEditor container" style={{ width: '80%' }}>
      <div className="columns">
        <div className="column">
          <textarea
            className="editor__container textarea has-fixed-size"
            placeholder="여기에 내용을 입력하세요."
            onChange={handleTitleChange}
            ref={writeEditor}
            rows={1}
            value={title}
          />
        </div>
        {/*
        <div className="column toolbar__buttons" style={{ textAlign: 'right' }}>
          <button className="toolbar__button button">첨삭하기</button>
          <button className="toolbar__button button">발행하기</button>
        </div>*/}
      </div>
    </div>
  );
};

export default WriteEditor;

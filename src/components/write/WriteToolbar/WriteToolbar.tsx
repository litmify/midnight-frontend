import * as React from 'react';
import './WriteToolbar.scss';

type Props = {
  writeEditor: any;
};

const WriteToolbar = function({ writeEditor }: Props) {
  const [title, setTitle] = React.useState('');

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
    e.target.style.cssText = 'height: auto; padding: 0;';
    e.target.style.cssText = 'height:' + e.target.scrollHeight + 'px';
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      writeEditor.current.firstChild.firstChild.firstChild.focus();
    }
  };

  return (
    <div className="WriteToolbar container" style={{ width: '80%' }}>
      <div className="columns">
        <div className="column is-two-thirds">
          <textarea
            className="toolbar__title textarea has-fixed-size"
            placeholder="여기에 제목을 입력하세요."
            onChange={handleTitleChange}
            onKeyDown={handleKeyPress}
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

export default WriteToolbar;

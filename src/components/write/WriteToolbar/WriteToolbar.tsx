import * as React from 'react';
import './WriteToolbar.scss';

type Props = {
  quill: any;
};

const WriteToolbar = function({ quill }: Props) {
  const titleInput: any = React.useRef();
  const editorSettingModal: any = React.useRef();
  const [title, setTitle] = React.useState('');

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
    e.target.style.cssText = 'height: auto; padding: 0;';
    e.target.style.cssText = 'height:' + e.target.scrollHeight + 'px';
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      quill.focus();
    }
  };

  const openEditorSetting = () => {
    console.log(quill.getText());
    editorSettingModal.current.className = 'modal is-active';
  };

  const closeEditorSetting = (isConfirmed: boolean) => {
    editorSettingModal.current.className = 'modal';

    if (!isConfirmed) return;
  };

  React.useEffect(() => {
    titleInput.current.focus();
  }, []);

  return (
    <div className="WriteToolbar container">
      <div className="columns">
        <div className="column is-8 is-offset-2">
          <textarea
            className="toolbar__title textarea has-fixed-size"
            placeholder="제목을 입력하세요."
            onChange={handleTitleChange}
            onKeyDown={handleKeyPress}
            ref={titleInput}
            rows={1}
            value={title}
          />
        </div>

        <div className="column is-2 toolbar__buttons" style={{ textAlign: 'right' }}>
          <div>
            <button
              className="toolbar__button button is-secondary"
              style={{ marginRight: '1rem' }}
              onClick={openEditorSetting}
            >
              첨삭
            </button>
            <button className="toolbar__button button is-primary">작성</button>
          </div>
        </div>
      </div>

      <div className="modal" ref={editorSettingModal}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">에디터 설정 변경</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => closeEditorSetting(false)}
            ></button>
          </header>
          <section className="modal-card-body"></section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={() => closeEditorSetting(true)}>
              Save changes
            </button>
            <button className="button" onClick={() => closeEditorSetting(false)}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default WriteToolbar;

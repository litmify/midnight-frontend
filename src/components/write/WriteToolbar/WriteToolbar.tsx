import * as React from 'react';
import './WriteToolbar.scss';
import { useHistory } from 'react-router';
import axios from 'axios';

type Props = {
  quill: any;
  isReadMode: boolean;
  titleRead?: string;
  id?: string;
};

const WriteToolbar = function({ quill, isReadMode, titleRead, id }: Props) {
  const titleInput: any = React.useRef();
  const editorSettingModal: any = React.useRef();
  const [title, setTitle] = React.useState('');
  const [isOwner, setIsOwner] = React.useState(false);
  const history = useHistory();

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
    editorSettingModal.current.className = 'modal is-active';
  };

  const closeEditorSetting = (isConfirmed: boolean) => {
    editorSettingModal.current.className = 'modal';

    if (!isConfirmed) return;
  };

  const goBack = () => {
    history.push('/mypage');
  };

  const publish = async () => {
    if (isReadMode) return;

    if (!title) {
      alert('제목을 입력해주세요.');
      return;
    }

    const axiosBody = {
      title: title,
      isPublic: true,
      body: quill.getContents(),
    };
    console.log(axiosBody);
    await axios
      .post(process.env.REACT_APP_API_URL + 'post/create', axiosBody, {
        headers: { cilic: localStorage.getItem('cilic') },
      })
      .then(res => {
        if (res.data.result) {
          alert('글을 발행하였습니다.');
          history.push('/mypage');
        } else {
          alert('예상치 못한 문제가 발생하였습니다.\n잠시 후 다시 시도해주세요.');
        }
      })
      .catch(() => {
        alert('예상치 못한 문제가 발생하였습니다.\n잠시 후 다시 시도해주세요.');
      });
  };

  const checkOwner = async function() {
    const r = await axios
      .get(process.env.REACT_APP_API_URL + 'post/check?postId=' + id, {
        headers: { cilic: localStorage.getItem('cilic') },
      })
      .then(res => {
        return res.data.result;
      })
      .catch(() => false);
    setIsOwner(r);
  };

  const deletePost = async function() {
    await axios
      .post(
        process.env.REACT_APP_API_URL + 'post/delete',
        { postId: id },
        { headers: { cilic: localStorage.getItem('cilic') } },
      )
      .then(res => {
        if (res.data.result) {
          alert('정상적으로 삭제되었습니다.');
          history.push('/');
        } else {
          alert('예상치 못한 문제가 발생하였습니다.\n잠시 후 다시 시도해주세요.');
        }
      })
      .catch(() => {
        alert('예상치 못한 문제가 발생하였습니다.\n잠시 후 다시 시도해주세요.');
      });
  };

  React.useEffect(() => {
    checkOwner();
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
            value={isReadMode ? titleRead : title}
            disabled={isReadMode}
          />
        </div>

        {!isReadMode ? (
          <>
            <div
              className="column is-2 toolbar__buttons"
              style={{ textAlign: 'left', paddingLeft: 0, marginLeft: '-3rem' }}
            >
              <div>
                {/*
            <button
              className="toolbar__button button is-secondary"
              style={{ marginRight: '1rem' }}
              onClick={openEditorSetting}
            >
              첨삭
            </button>
            */}
                <button
                  className="toolbar__button button is-primary"
                  style={{ marginRight: '1rem' }}
                  onClick={() => publish()}
                >
                  발행
                </button>
                <button className="toolbar__button button" onClick={() => goBack()}>
                  취소
                </button>
              </div>
            </div>{' '}
          </>
        ) : (
          <>
            <div
              className="column is-2 toolbar__buttons"
              style={{ textAlign: 'left', paddingLeft: 0, marginLeft: '-3rem' }}
            >
              {isOwner ? (
                <button
                  className="toolbar__button button is-danger"
                  style={{ marginRight: '1rem' }}
                  onClick={() => deletePost()}
                >
                  삭제
                </button>
              ) : null}
              <button className="toolbar__button button" onClick={() => goBack()}>
                돌아가기
              </button>
            </div>
          </>
        )}
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

import * as React from 'react';
import axios from 'axios';

import '../home/Home.scss';

import Navigation from '../base/navigation/Navigation';
import { useHistory } from 'react-router';

type Props = {
  children?: React.ReactNode;
};

const MyPage = function({ children }: Props) {
  const history = useHistory();
  const loadMoreButton: any = React.useRef();
  const [end, setEnd] = React.useState(false);
  const [skip, setSkip] = React.useState(0);
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    getPost();
  }, []);

  const getPost = async function() {
    axios
      .get(process.env.REACT_APP_API_URL + 'post?owner=true', {
        headers: { cilic: localStorage.getItem('cilic') },
      })
      .then(res => {
        console.log(res);

        if (res.data.payload.end) {
          loadMoreButton.current.innerHTML = '모두 불러왔습니다.';
          setEnd(true);
          return;
        }

        res.data.payload.forEach((post: any) => {
          let d = new Date(post.createdAt);
          post.createdAt = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        });

        const temp = posts;
        const r = temp.concat(res.data.payload);
        setPosts(r);
        setSkip(skip + 9);
      })
      .catch(() => {});
  };

  const goPost = function(id: string): any {
    history.push(`/read/${id}`);
  };

  return (
    <div className="MyPage">
      <Navigation />
      <div className="container" style={{ marginTop: '10rem', width: '50%' }}>
        <h1 style={{ fontWeight: 800, fontSize: '2rem', marginBottom: '1rem' }}>내 글</h1>
        <div className="columns is-multiline">
          {posts.map((post: any, i) => {
            return (
              <div
                className="column is-one-third-desktop is-half-tablet"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  goPost(post.id);
                }}
                key={i}
              >
                <div className="card">
                  <div className="card-image">
                    <div className="image">
                      <img src="https://picsum.photos/1000/480" alt="" />
                    </div>
                  </div>
                  <footer className="card-footer" style={{ padding: '1rem' }}>
                    <div
                      className="container"
                      style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                    >
                      <h1>{post.title}</h1>
                      <h2>{post.createdAt}</h2>
                    </div>
                  </footer>
                </div>
              </div>
            );
          })}
        </div>
        <div className="row" style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button
            className="button is-full"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              getPost();
            }}
            ref={loadMoreButton}
            disabled={end}
          >
            더 불러오기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;

import * as React from 'react';
import axios from 'axios';

import './Home.scss';

import Navigation from '../base/navigation/Navigation';
import { useHistory } from 'react-router';

type Props = {
  children?: React.ReactNode;
};

const Home = function({ children }: Props) {
  const history = useHistory();
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + 'project', {
        headers: { cilic: localStorage.getItem('cilic') },
      })
      .then(res => {
        setProjects(res.data.payload.projects);
      })
      .catch(() => setProjects([]));
  }, []);

  const goProject = function(id: string): any {
    history.push(`/project/${id}`);
  };

  return (
    <div className="Home">
      <Navigation />
      <div className="container" style={{ marginTop: '10rem', width: '50%' }}>
        <h1 style={{ fontWeight: 800, fontSize: '2rem', marginBottom: '1rem' }}>
          최근 추가된 프로젝트
        </h1>
        <div className="columns is-multiline">
          {projects.map((project: any, i) => {
            return (
              <div
                className="column is-one-third-desktop is-half-tablet"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  goProject(project.id);
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
                    <div className="container">
                      <h1 style={{ fontWeight: 800 }}>{project.title}</h1>
                      <h2>{project.description}</h2>
                    </div>
                  </footer>
                </div>
              </div>
            );
          })}
          <div className="column is-one-third-desktop is-half-tablet" style={{ cursor: 'pointer' }}>
            더 보기
          </div>
        </div>
        <hr />
        <h1 style={{ fontWeight: 800, fontSize: '2rem', marginBottom: '1rem' }}>
          최근 추가된 글
        </h1>
        <div className="columns is-multiline">
          {projects.map((project: any, i) => {
            return (
              <div
                className="column is-one-third-desktop is-half-tablet"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  goProject(project.id);
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
                    <div className="container">
                      <h1 style={{ fontWeight: 800 }}>{project.title}</h1>
                      <h2>{project.description}</h2>
                    </div>
                  </footer>
                </div>
              </div>
            );
          })}
          <div className="column is-one-third-desktop is-half-tablet" style={{ cursor: 'pointer' }}>
            더 보기
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

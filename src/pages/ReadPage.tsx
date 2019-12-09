import * as React from 'react';
import axios from 'axios';

import Write from '../components/write/Write';

const ReadPage = function({ match }: any) {
  const [is404, setIs404] = React.useState(false);
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    checkValidRead();
  }, []);

  const checkValidRead = async function() {
    await axios
      .get(process.env.REACT_APP_API_URL + 'post?postId=' + match.params.id, {
        headers: { cilic: localStorage.getItem('cilic') },
      })
      .then(res => {
        setTitle(res.data.payload.post.title);
      })
      .catch(() => {
        setIs404(true);
      });
  };

  return <>{is404 ? <h1>404</h1> : <Write isReadMode={true} title={title} id={match.params.id} />}</>;
};

export default ReadPage;

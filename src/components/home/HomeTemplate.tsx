import * as React from 'react';
import './HomeTemplate.scss';

type Props = {
  children?: React.ReactNode,
};

const HomeTemplate = function({ children }: Props) {
  return(
    <div className="Home">
      <h1>Home</h1>
    </div>
  )
};

export default HomeTemplate;
import * as React from 'react';
import './HomeTemplate.scss';

import { Container, Row, Col } from 'react-bootstrap';

import Navigation from '../base/navigation/Navigation';

type Props = {
  children?: React.ReactNode;
};

const HomeTemplate = function({ children }: Props) {
  return (
    <div className="Home">
      <Navigation />
      <Container>
        <Row>
          <Col>
            <h1>This is col 1.</h1>
          </Col>
          <Col>
            <h1>This is col 2.</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeTemplate;

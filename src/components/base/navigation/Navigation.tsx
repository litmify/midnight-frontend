import * as React from 'react';
import './Navigation.scss';

import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Navigation = function() {
  return (
    <Navbar className="app-navbar">
      <Container>
        <Navbar.Brand href="/">midnight</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link href="/auth/login">
            <Button variant="light">
              Log in
            </Button>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

import React from 'react';
import {
  Navbar, Nav, Form, FormControl, Button, InputGroup,
} from 'react-bootstrap';
import { faCartArrowDown, faSearch, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

interface IStates {
    searchOpen: boolean
}

class NavigationBar extends React.Component<{}, IStates> {
    public readonly state: Readonly<IStates> = {
      searchOpen: false,
    }

    public render() {
      const { searchOpen } = this.state;
      return (
        <div className="sticky-top">
          <Navbar className="main-navbar" sticky="top" expand="sm">
            <Navbar.Brand>
              <Link
                className="nav-link"
                to={{
                  pathname: '/',
                }}
              >
                <h4>354TheStars</h4>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Link
                  className="nav-link"
                  to={{
                    pathname: '/listings',
                  }}
                >
               VIEW LISTINGS
                </Link>
                <Link
                  className="nav-link"
                  to={{
                    pathname: '/account',
                  }}
                >
               MY ACCOUNT
                </Link>
                <Link
                  className="nav-link"
                  to={{
                    pathname: '/cart',
                  }}
                >
                  <FontAwesomeIcon icon={faCartArrowDown} />
                </Link>
                <Nav.Link><div onClick={() => this.setState({ searchOpen: !searchOpen })}><FontAwesomeIcon icon={faSearch} /></div></Nav.Link>
              </Nav>
              <Form className={searchOpen ? '' : 'd-none'} inline>
                <InputGroup>
                  <FormControl
                    placeholder="Search..."
                  />
                  <InputGroup.Append>
                    <Button variant="warning" className="styled-button">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form>
            </Navbar.Collapse>
          </Navbar>
        </div>
      );
    }
}

export default NavigationBar;

import React from 'react';
import {
  Navbar, Nav, Form, FormControl, Button,
} from 'react-bootstrap';
import { faCartArrowDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

interface IStates {
    searchOpen: boolean
}

class Header extends React.Component<{}, IStates> {
    public readonly state: Readonly<IStates> = {
      searchOpen: false,
    }

    public render() {
      const { searchOpen } = this.state;
      return (
        <Navbar className="header" fixed="top" expand="lg">
          <Navbar.Brand>
            <Link
              className="nav-link"
              to={{
                pathname: '/',
              }}
            >
              354TheStars
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
               View Listings
              </Link>
              <Link
                className="nav-link"
                to={{
                  pathname: '/account',
                }}
              >
               My Account
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
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      );
    }
}

export default Header;

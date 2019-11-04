import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Search from '../../../components/Search/search';

class NavigationBar extends React.Component<{}> {
  public render() {
    return (
      <div className="sticky-top">
        <Navbar className="main-navbar" sticky="top" expand="sm">
          <Navbar.Brand>
            <Link className="nav-link align-self-center mt-1" to={{ pathname: '/' }}>
              <h4>354TheStars</h4>
            </Link>
          </Navbar.Brand>
          {/*  Search bar component */}
          <Search />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Link className="nav-link align-self-center" to={{ pathname: '/account' }}>
                 MY ACCOUNT
              </Link>
              <Link className="nav-link align-self-center" to={{ pathname: '/createlisting' }}>
                 CREATE LISTING
              </Link>
              <Link className="nav-link align-self-center mt-1" to={{ pathname: '/cart' }}>
                <FontAwesomeIcon icon={faCartArrowDown} />
              </Link>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;

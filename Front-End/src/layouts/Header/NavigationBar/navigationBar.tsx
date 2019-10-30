import React from 'react';
import {
  Navbar, Nav, DropdownButton, Dropdown,
} from 'react-bootstrap';
import {
  faCartArrowDown, faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StoreContext } from '../../../store';
import Search from '../../../components/Search/search';

class NavigationBar extends React.Component<{}> {
    private handleLogout = () => {
      const { logout } = this.context;

      logout();
    }

    public render() {
      const { isAuth, currentUser } = this.context;

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
              <Nav className="ml-auto">
                <Link
                  className="nav-link"
                  to={{
                    pathname: '/listings',
                  }}
                >
               VIEW LISTINGS
                </Link>
                {isAuth
                  ? (
                    <DropdownButton
                      title={<FontAwesomeIcon icon={faUser} />}
                      id="accountDropdown"
                      className="nav-dropdown"
                    >
                      <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
                    </DropdownButton>
                  )
                  : (
                    <Link
                      className="nav-link"
                      to={{
                        pathname: '/login',
                      }}
                    >
                      LOGIN
                    </Link>
                  )}
                <Link
                  className="nav-link"
                  to={{
                    pathname: '/cart',
                  }}
                >
                  <FontAwesomeIcon icon={faCartArrowDown} />
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      );
    }
}

NavigationBar.contextType = StoreContext;
export default NavigationBar;

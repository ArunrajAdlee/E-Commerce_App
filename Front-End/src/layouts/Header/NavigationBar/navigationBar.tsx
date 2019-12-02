import React from 'react';
import {
  Navbar, Nav, DropdownButton, Dropdown,
} from 'react-bootstrap';
import { faCartArrowDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Sticky } from 'react-sticky';
import { StoreContext } from '../../../store';
import Search from '../../../components/Search/search';
import Category from '../../../components/Category/category';
import CreateListing from '../../../components/CreateListing';

class NavigationBar extends React.Component<{}> {
  private handleLogout = () => {
    const { logout } = this.context;
    logout();
  };

  public render() {
    const { isAuth, userInfo, isAdmin } = this.context;
    return (
      <Sticky topOffset={40}>
        {({ style, isSticky }) => (
          <div className="sticky-top">
            <div
              className={`main-navbar ${!isSticky ? 'mt-40p' : ''} `}
              style={style}
            >
              <Navbar className={isSticky ? 'sticky-nav' : ''} expand="lg">
                <Navbar.Brand>
                  <Link
                    className="nav-link align-self-center mt-1"
                    to={{ pathname: '/' }}
                  >
                    <h4>354TheStars</h4>
                  </Link>
                </Navbar.Brand>
                {/*  Search bar component */}
                <Search />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ml-auto align-items-center">
                    <Category />
                    <Link
                      className="nav-link"
                      to={{
                        pathname: '/listings',
                      }}
                    >
                      VIEW LISTINGS
                    </Link>
                    {isAuth ? (
                      <DropdownButton
                        title={<FontAwesomeIcon icon={faUser} />}
                        id="accountDropdown"
                        className="nav-dropdown user-icon"
                      >
                        <Dropdown.Item onClick={this.handleLogout}>
                          Logout
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        {/* OnClick, go to account settings page */}
                        <Dropdown.Item as="div">
                          <Link
                            className="nav-link"
                            to={{
                              pathname: '/createListing',
                            }}
                          >
                            Create Listing
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item as="div">
                          <Link
                            className="nav-link align-self-center mt-1"
                            to={{ pathname: '/profile' }}
                          >
                            {`${userInfo.first_name}'s profile`}
                          </Link>
                        </Dropdown.Item>
                        {isAdmin ? (
                          <Dropdown.Item as="div">
                            <Link
                              className="nav-link align-self-center mt-1"
                              to={{ pathname: '/admin/activity' }}
                            >
                              Admin Panel
                            </Link>
                          </Dropdown.Item>
                        ) : ''}
                      </DropdownButton>
                    ) : (
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
          </div>
        )}
      </Sticky>
    );
  }
}

NavigationBar.contextType = StoreContext;
export default NavigationBar;

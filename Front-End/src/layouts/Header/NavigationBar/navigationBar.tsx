import React from 'react';
import {
    Navbar, Nav, Form, FormControl, Button, InputGroup,
} from 'react-bootstrap';
import { faCartArrowDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

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
                <Form className="w-50 mr-3">
                    <InputGroup>
                        <FormControl type="text" placeholder="Search"/>
                        <InputGroup.Append>
                            <Button variant="outline-primary"><FontAwesomeIcon icon={faSearch} /></Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Link className="nav-link align-self-center" to={{ pathname: '/account' }}>
                            MY ACCOUNT
                        </Link>
                        <Link className="nav-link align-self-center mt-1" to={{ pathname: '/cart' }}>
                            <FontAwesomeIcon icon={faCartArrowDown}/>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
  }
}

export default NavigationBar;

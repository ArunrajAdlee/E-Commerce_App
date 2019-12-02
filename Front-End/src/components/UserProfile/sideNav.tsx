import * as React from 'react';
import {
  Card, ListGroup, ListGroupItem, Nav,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserProfileSideNav = () => (
  <Card className="mb-4 user-profile-sidenav">
    <Card.Header className="text-light">My Profile</Card.Header>
    <Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <Nav.Item>
            <Link to="/profile">User Info</Link>
          </Nav.Item>
        </ListGroupItem>
        <ListGroupItem>
          <Nav.Item>
            <Link to="/profile/orderhistory">Order History</Link>
          </Nav.Item>
        </ListGroupItem>
      </ListGroup>
    </Card.Body>
  </Card>
);

export default UserProfileSideNav;

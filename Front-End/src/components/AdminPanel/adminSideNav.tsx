import * as React from 'react';
import {
  Card, ListGroup, ListGroupItem, Nav,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminSideNav = () => (
  <Card className="mb-4 admin-panel-sidenav">
    <Card.Header>Admin Panel</Card.Header>
    <Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <Nav.Item>
            <Link to="/admin/activity">Site Activity</Link>
          </Nav.Item>
        </ListGroupItem>
        <ListGroupItem>
          <Nav.Item>
            <Link to="/">Order History</Link>
          </Nav.Item>
        </ListGroupItem>
      </ListGroup>
    </Card.Body>
  </Card>
);

export default AdminSideNav;

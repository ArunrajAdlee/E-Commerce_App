import * as React from "react";
import { Card, ListGroup, ListGroupItem, Nav } from "react-bootstrap";
export interface SideNavProps {}
export interface SideNavState {}

interface Props {
  handleNav: (id: number) => void;
}

class SideNav extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <Card>
        <Card.Header className="bg-info text-light">Options</Card.Header>
        <Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <Nav.Item>
                <Nav.Link onClick={() => this.props.handleNav(1)}>
                  User Info
                </Nav.Link>
              </Nav.Item>
            </ListGroupItem>
            <ListGroupItem>
              <Nav.Item>
                <Nav.Link onClick={() => this.props.handleNav(2)}>
                  Order History
                </Nav.Link>
              </Nav.Item>
            </ListGroupItem>
            <ListGroupItem>
              <Nav.Item>
                <Nav.Link onClick={() => this.props.handleNav(3)}>
                  Listings
                </Nav.Link>
              </Nav.Item>
            </ListGroupItem>
            <ListGroupItem>
              <Nav.Item>
                <Nav.Link onClick={() => this.props.handleNav(4)}>
                  Reviews
                </Nav.Link>
              </Nav.Item>
            </ListGroupItem>
          </ListGroup>
        </Card.Body>
      </Card>
    );
  }
}

export default SideNav;

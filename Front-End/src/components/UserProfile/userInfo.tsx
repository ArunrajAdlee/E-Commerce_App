import * as React from "react";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Container,
  Col,
  Row,
  Button
} from "react-bootstrap";
import {
  faHome,
  faMailBulk,
  faPhoneAlt,
  faUser,
  faBuilding,
  faEdit
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface UserDisplayProps {
  handleEdit: () => void;
  username: string;
  first_name: string;
  last_name: string;
  brand_name: string;
  phone_number: string;
  email: string;
  address: number;
  street_name: string;
  street_number: number;
  unit_number: number;
  city: string;
  province: string;
  postal_code: string;
  country: string;
}

interface IUserInfo {}

class UserInfo extends React.Component<UserDisplayProps, {}> {
  render() {
    console.log("Phone Number: ", this.props.phone_number);
    return (
      <Card>
        <Card.Header className="bg-info text-light">
          User Info{" "}
          <Button
            onClick={() => this.props.handleEdit()}
            className="btn-sm float-right bg-warning"
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </Card.Header>
        <Card.Body>
          <Container fluid>
            <Row>
              <Col>
                <ListGroup className="list-group-flush text-center ">
                  <ListGroupItem className="font-weight-bold text-xl">
                    <h3>
                      <FontAwesomeIcon icon={faUser} /> {"      "}
                    </h3>
                  </ListGroupItem>
                  <ListGroupItem>
                    <h3>
                      {this.props.first_name}
                      {"  "}
                      {this.props.last_name}
                    </h3>
                    <p className="text-align-left">{this.props.username}</p>
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    <FontAwesomeIcon icon={faMailBulk} /> {"      "}
                    {this.props.email}
                  </ListGroupItem>
                  <ListGroupItem>
                    <FontAwesomeIcon icon={faPhoneAlt} /> {"      "}
                    {this.props.phone_number}
                  </ListGroupItem>
                  <ListGroupItem>
                    <FontAwesomeIcon icon={faHome} /> {"      "}
                    {this.props.street_number} {this.props.street_name}{" "}
                    {this.props.city} {this.props.province} {this.props.country}{" "}
                    {this.props.postal_code}
                  </ListGroupItem>
                  <ListGroupItem>
                    <FontAwesomeIcon icon={faBuilding} />
                    {"      "}
                    {this.props.brand_name}
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </Card.Body>
        <Card.Footer className="bg-info"></Card.Footer>
      </Card>
    );
  }
}

export default UserInfo;

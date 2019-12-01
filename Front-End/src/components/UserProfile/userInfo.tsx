import * as React from 'react';
import {
  Card,
  ListGroup,
  ListGroupItem,
  Container,
  Col,
  Row,
  Button,
} from 'react-bootstrap';
import {
  faHome,
  faMailBulk,
  faPhoneAlt,
  faUser,
  faBuilding,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface UserDisplayProps {
  handleShowEdit: (isEdit: boolean) => void;
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

const UserInfo = (props : UserDisplayProps) => {
  const {
    first_name, last_name, username, email, phone_number, street_number, street_name, city, province, country, postal_code, brand_name, handleShowEdit,
  } = props;
  return (
    <Card>
      <Card.Header className="text-light">
        <span>
          <b>{`Welcome Back ${first_name}`}</b>
          <Button
            onClick={() => handleShowEdit(true)}
            className="btn-sm float-right bg-warning"
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </span>
      </Card.Header>
      <Card.Body>
        <Container fluid>
          <Row>
            <Col>
              <ListGroup className="list-group-flush text-center ">
                <ListGroupItem className="font-weight-bold text-xl">
                  <h3>
                    <FontAwesomeIcon icon={faUser} />
                    {' '}
                    {'      '}
                  </h3>
                </ListGroupItem>
                <ListGroupItem>
                  <h3>
                    {first_name}
                    {'  '}
                    {last_name}
                  </h3>
                  <p className="text-align-left">{username}</p>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <FontAwesomeIcon icon={faMailBulk} />
                  {' '}
                  {'      '}
                  {email}
                </ListGroupItem>
                <ListGroupItem>
                  <FontAwesomeIcon icon={faPhoneAlt} />
                  {' '}
                  {'      '}
                  {phone_number}
                </ListGroupItem>
                <ListGroupItem>
                  <FontAwesomeIcon icon={faHome} />
                  {' '}
                  {'      '}
                  {street_number}
                  {' '}
                  {street_name}
                  {' '}
                  {city}
                  {' '}
                  {province}
                  {' '}
                  {country}
                  {' '}
                  {postal_code}
                </ListGroupItem>
                <ListGroupItem>
                  <FontAwesomeIcon icon={faBuilding} />
                  {'      '}
                  {brand_name}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
};

export default UserInfo;

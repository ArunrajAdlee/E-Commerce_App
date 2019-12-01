import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Container, Row, Col, Button, Dropdown, Card,
} from 'react-bootstrap';

interface IProps extends RouteComponentProps<any> {}

class Cart extends React.Component<IProps> {
  public render() {
    return (
      <Container>
        <Row>
          <Col md={9}>
            <Container>
              <Row className="pb-5">
                <Col xs={3}>
                  <img src="https://www.bing.com/th?id=OIP.slZFlfLBOB74YaCBb3bRkQHaHa&pid=Api&rs=1" className="w-100" />
                </Col>
                <Col xs={7}>
                  <h3>This is the name of the product</h3>
                </Col>
                <Col xs={2}>
                  <h6 className="text-secondary">$99.99</h6>
                  <Dropdown className="">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      1
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">1</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">2</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">3</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <Row className="pb-5">
                <Col xs={3}>
                  <img src="https://cdn.shopify.com/s/files/1/0259/1735/products/custom_ps4_console_skins_template_2048x.png?v=1515575403" className="w-100" />
                </Col>
                <Col xs={7}>
                  <h3>This is the name of the product</h3>
                </Col>
                <Col xs={2}>
                  <h6 className="text-secondary">$99.99</h6>
                  <Dropdown className="">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      1
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">1</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">2</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">3</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Subtotal: $199.98</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">2 Items</Card.Subtitle>
              </Card.Body>
            </Card>
            <Button
              type="submit"
              className="btn-block styled-button"
            >
              Proceed to Checkout
            </Button>
          </Col>
        </Row>
        <Container />
      </Container>
    );
  }
}

export default Cart;

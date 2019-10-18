import React from 'react';
import {
  Row, Col, InputGroup, FormControl, Button,
} from 'react-bootstrap';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter, faFacebook, faYoutube, faSlack,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Footer = () => (
  <div className="footer-container">
    <div className="footer-content">
      <Row>
        <Col md={4} sm={6}>
          <h4>About Us</h4>
          <br />
            A brand new e-commerce website which allows any user to buy and sell whatever they want.
        </Col>
        <Col md={4} sm={6}>
          <h4>Newsletter</h4>
          <label htmlFor="basic-url" className="mt-3">Stay updated with our listings</label>
          <InputGroup className="mb-3">
            <FormControl
              id="newsletter-email"
              placeholder="Enter Email"
              aria-label="Username"
            />
            <InputGroup.Append>
              <Button className="submit-newsletter">
                <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
        <Col md={4} sm={6}>
          <h4>Follow Us</h4>
          <br />
          <div className="footer-social">
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faYoutube} />
            <FontAwesomeIcon icon={faSlack} />
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <span className="marginAuto">Copyright ©2019 All rights reserved</span>
      </Row>
    </div>
  </div>

);

export default Footer;

import React from 'react';
import {
  Carousel, Button, Row, Col, Card,
} from 'react-bootstrap';
import {
  faArrowLeft, faArrowRight, faTruck, faHeadset, faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import LatestListings from './LastestListings/latestListings';

interface IStates {
}

class LandingPage extends React.Component<{}, IStates> {
    public readonly state: Readonly<IStates> = {
    }

    public render() {
      return (
        <>
          <div className="landing-banner">
            <Row className="banner-content">
              <Col className="banner-text" md={12} lg={5}>
                <h1>Check out all our amazing products</h1>
                <h3>Great products from great vendors, all in one location</h3>

                <Link to="/listings">
                  <Button variant="warning" className="styled-button mt-4">
                    <span>
                    View all our Listings!
                      <FontAwesomeIcon className="ml-5" icon={faArrowRight} />
                    </span>
                  </Button>
                </Link>
              </Col>
              <Col md={12} lg={7}>
                <Carousel indicators={false} prevIcon={<FontAwesomeIcon color="black" icon={faArrowLeft} />} nextIcon={<FontAwesomeIcon color="black" icon={faArrowRight} />}>
                  <Carousel.Item>
                    <img
                      className="d-block"
                      src={require('../../assets/img/banner/banner-img.png')}
                      alt="First slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block "
                      src={require('../../assets/img/banner/banner-img2.png')}
                      alt="Third slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block"
                      src={require('../../assets/img/banner/banner-img3.png')}
                      alt="Fourth slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block"
                      src={require('../../assets/img/banner/banner-img4.png')}
                      alt="Fifth slide"
                    />
                  </Carousel.Item>
                </Carousel>
              </Col>
            </Row>

          </div>

          <div className="landing-content">
            <Card className="landing-features mb-5">
              <Card.Body>
                <Row>
                  <Col md={3} sm={12}>
                    <FontAwesomeIcon icon={faTruck} />
                    <h5>Free Delivery</h5>
                    <p>Free Shipping on all orders</p>
                  </Col>
                  <Col md={3} sm={12}>
                    <FontAwesomeIcon icon={faUndo} />
                    <h5>Return Policy</h5>
                    <p>Return orders free of charge</p>
                  </Col>
                  <Col md={3} sm={12}>
                    <FontAwesomeIcon icon={faHeadset} />
                    <h5>24/7 Support</h5>
                    <p>Chat with our expert technicians</p>
                  </Col>
                  <Col md={3} sm={12}>
                    <FontAwesomeIcon icon={faPaypal} />
                    <h5>Secure Payment</h5>
                    <p>Secure transactions through PayPal</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <div className="landing-latest-listings">
              <LatestListings />
            </div>

          </div>

        </>
      );
    }
}

export default LandingPage;

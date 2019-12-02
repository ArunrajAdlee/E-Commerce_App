import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  Button, Col, Container, Row, Spinner,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import CartListing from './cartListing';
import { IListing } from '../Listings/Listing/listing';
import { api, server } from '../../server';

interface IStates {
  isLoading: boolean;
  totalPriceBeforeTax: number;
  totalItems: number;
  carts: ICartItem[];
}

interface ICartItem {
  id: number,
  user_id: number,
  quantity: number,
  listing: IListing,
}

interface IProps extends RouteComponentProps<any> {}

class Cart extends React.Component<IProps, IStates> {
  public readonly state: Readonly<IStates> = {
    isLoading: true,
    totalItems: 0,
    totalPriceBeforeTax: 0,
    carts: [],
  };

  public async componentDidMount() {
    const result = await server.get(api.cart);
    const resCarts: ICartItem[] = result.data.cartItems.map((cart: any) => ({
      id: cart.id,
      user_id: cart.user_id,
      quantity: cart.quantity,
      listing: cart.listing,
    }));

    this.setState({
      isLoading: false,
      totalPriceBeforeTax: result.data.total_price_before_tax,
      totalItems: result.data.total_items,
      carts: resCarts,
    });
  }

  public render() {
    const {
      isLoading, totalPriceBeforeTax, totalItems, carts,
    } = this.state;

    const {
      history, location, match,
    } = this.props;

    return isLoading ? <Spinner animation="border" variant="warning" /> : (
      totalItems == 0 ? (
        <Container>
          <Row className="align-items-center">
            <Container>
              <Row>
                <Col xs={12}>
                  <h1 className="text-center">Your Cart is empty!</h1>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <h5 className="text-center">Start adding listings today!</h5>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs={12} className="text-center">
                  <Link to="/listings">
                    <Button variant="warning" className="styled-button mt-4 w-auto">
                      <span>
                    View all our Listings!
                        <FontAwesomeIcon className="ml-5" icon={faArrowRight} />
                      </span>
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Container>
          </Row>
        </Container>
      ) : (
        <Container>
          <Row>
            {/* Cart element */}
            <Col md={8}>
              <Container>
                {carts.map((cart: ICartItem) => (
                  <CartListing
                    key={cart.id}
                    listing={cart.listing}
                    quantity={cart.quantity}
                    id={cart.id}
                    history={history}
                    location={location}
                    match={match}
                  />
                ))}
              </Container>
            </Col>
            {/* Cart summary */}
            <Col md={4}>
              <div className="order-summary">
                <Row>
                  <Col className="text-center">
                    <h5>Your Order</h5>
                    <hr />
                  </Col>
                </Row>
                {/* Subtotal */}
                <Row>
                  <Col xs={6}>
                    <h5>Subtotal:</h5>
                  </Col>
                  <Col xs={6}>
                    <h5>
                    $
                      {totalPriceBeforeTax}
                    </h5>
                  </Col>
                </Row>
                {/* Items */}
                <Row className="text-secondary">
                  <Col xs={6}>
                    <h5>Items:</h5>
                  </Col>
                  <Col xs={6}>
                    <h5>
                      {totalItems}
                      {' '}
                    </h5>
                  </Col>
                </Row>
                <br />
                <Link to="/checkout" className="text-decoration-none">
                  <Button
                    type="submit"
                    className="btn-block styled-button"
                  >
                  Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
          <Container />
        </Container>
      ));
  }
}

export default Cart;

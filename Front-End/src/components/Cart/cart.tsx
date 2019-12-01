import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Button, Card, Col, Container, Row, Spinner,
} from 'react-bootstrap';
import CartListing from './cartListing';
import { IListing } from '../Listings/Listing/listing';
import { api, server } from '../../server';

interface IStates {
  listings: IListing[];
  isLoading: boolean;
  subtotal: number;
  numOfItems: number;
}

interface IProps extends RouteComponentProps<any> {}

class Cart extends React.Component<IProps, IStates> {
  public readonly state: Readonly<IStates> = {
    listings: [],
    isLoading: true,
    subtotal: 0,
    numOfItems: 0,
  };

  public async componentDidMount() {
    const result = await server.get(api.listings);
    const resListings: IListing[] = result.data.listings.map((product: any) => ({
      id: product.id,
      name: product.title,
      image: product.image,
      thumbnail: product.thumbnail,
      price: product.price,
      quantity: product.stock_count,
      isAvailable: product.status,
    }));

    // Calculate cart subtotal
    let cartSubtotal:number = 0;
    for (let i = 0; i < resListings.length; i++) {
      cartSubtotal += resListings[i].price;
    }

    // Calculate number of items
    let items:number = 0;
    for (let i = 0; i < resListings.length; i++) {
      items += resListings[i].quantity;
    }

    this.setState({
      isLoading: false,
      listings: resListings,
      subtotal: cartSubtotal,
      numOfItems: items,
    });
  }

  public render() {
    const {
      listings, isLoading, subtotal, numOfItems,
    } = this.state;

    return isLoading ? <Spinner animation="border" variant="warning" /> : (
      <Container>
        <Row>
          {/* Cart element */}
          <Col md={9}>
            <Container>
              {listings.map((listing: IListing) => (
                <CartListing key={listing.id} listing={listing} />))}
            </Container>
          </Col>
          {/* Cart summary */}
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>
                  Subtotal: $
                  {subtotal}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {numOfItems}
                  {' '}
                  Items
                </Card.Subtitle>
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

import React from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import {
  Button,
  Col, Image, Row, Container,
} from 'react-bootstrap';
import { IListing } from '../Listings/Listing/listing';
import { api, server } from '../../server';

interface IProps {
    quantity: number;
    listing: IListing;
    id: number;
    history: any,
    location: any,
    match: any,
}

interface IStates {
  editQuantity: number;
}

interface IProps extends RouteComponentProps<any> {}

class CartListing extends React.Component<IProps, IStates> {
  public readonly state: Readonly<IStates> = {
    editQuantity: -1,
  };

  private handleDelete = async () => {
    const { id } = this.props;

    try {
      const res = await server.delete(`/cart/${id}`);
      window.location.reload(false);
    } catch (e) {
      console.log(e);
    }
  };

  private handleEdit = async (event: any) => {
    const { listing } = this.props;
    const { editQuantity } = this.state;

    try {
      // If there has been a modification
      if (editQuantity != -1) {
        if (editQuantity == 0) throw 'Edit quantity is 0';
        // else if (editQuantity > listing.stockCount) throw 'Quantity desired is more than that in stock';
        else {
          const res = await server.post('/cart', { listing_id: listing!.id, quantity: editQuantity });
        }
        window.location.reload(false);
      }
    } catch (e) {
      if (e === 'Edit quantity is 0') return e;
      // if (e === 'Quantity desired is more than that in stock') this.setState({ noStockError: true });
    }
  };

  public render() {
    const { listing, quantity } = this.props;

    // Placeholder until there is a database with an error image to point to
    let listingImage = 'https://3.bp.blogspot.com/-XB85UD145qE/V5buf22iv2I/AAAAAAAAA1I/8LBmpwNX-rU7ZjzrHOS2b0F_Pj0xqpHIQCLcB/s1600/nia.png';
    if (listing.thumbnail) {
      listingImage = listing.thumbnail;
    }

    return (
      <Container>
        <Row className="pt-3 pb-1">
          {/* Image */}
          <Col xs={3}>
            <Link
              to={`/listings/${listing.id}`}
            >
              <Image src={listingImage} alt={listing.title} fluid />
            </Link>
          </Col>
          <Col xs={7}>
            <Row>
              {/* Name */}
              <Col>
                <Link
                  to={`/listings/${listing.id}`}
                  className="text-decoration-none text-dark"
                >
                  <h3>{listing.title}</h3>
                </Link>
              </Col>
            </Row>
            <br />
            <Row className="align-items-end">
              {/* Delete */}
              <Col xs={4}>
                <Button
                  variant="link"
                  onClick={this.handleDelete}
                  className="text-decoration-none text-dark ml-n2"
                >
                  <h6>Delete</h6>
                </Button>
              </Col>
              {/* Quantity */}
              <Col xs={4}>
                <input
                  type="number"
                  className="styled-input w-100 mb-2"
                  onKeyDown={() => false}
                  onChange={async (e: any) => {
                    await this.setState({ editQuantity: e.target.value });
                  }}
                  onBlur={async (e: any) => {
                    await this.handleEdit(e);
                  }}
                  max={listing.stockCount}
                  min={1}
                  defaultValue={quantity}
                />
              </Col>
            </Row>
          </Col>
          {/* Price */}
          <Col xs={2}>
            <h6 className="text-secondary">
          $
              {listing.price}
            </h6>
          </Col>
        </Row>
        <hr />
      </Container>
    );
  }
}

export default CartListing;

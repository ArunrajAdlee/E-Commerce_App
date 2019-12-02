import React from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import {
  Button,
  Col, Dropdown, Image, Row,
} from 'react-bootstrap';
import { IListing } from '../Listings/Listing/listing';
import { server } from '../../server';

interface IProps {
    quantity: number;
    listing: IListing;
    id: number;
    history: any,
    location: any,
    match: any,
}

interface IProps extends RouteComponentProps<any> {}

class CartListing extends React.Component<IProps> {
  private handleDelete = async () => {
    const { id } = this.props;

    try {
      const res = await server.delete(`/cart/${id}`);
      window.location.reload(false);
    } catch (e) {
      console.log(e);
    }
  };

  public render() {
    const { listing, quantity } = this.props;

    // Placeholder until there is a database with an error image to point to
    let listingImage = 'https://3.bp.blogspot.com/-XB85UD145qE/V5buf22iv2I/AAAAAAAAA1I/8LBmpwNX-rU7ZjzrHOS2b0F_Pj0xqpHIQCLcB/s1600/nia.png';
    if (listing.thumbnail) {
      listingImage = listing.thumbnail;
    }

    // Listing quantities
    const quantities:number[] = [];
    for (let i = 1; i < 10; i++) {
      quantities.push(i);
    }

    return (
      <Row className="pb-5">
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
              <Dropdown className="mb-2">
                <Dropdown.Toggle variant="outline-dark" size="sm" id="dropdown-basic">
                  {quantity}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {quantities.map((num) => (
                    <Dropdown.Item key={num} href="/cart">
                      {num}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
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
    );
  }
}

export default CartListing;

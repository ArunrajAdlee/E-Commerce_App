import React from 'react';
import { Link } from 'react-router-dom';
import {
  Col, Dropdown, Image, Row,
} from 'react-bootstrap';
import { IListing } from '../Listings/Listing/listing';

interface IProps {
    listing: IListing;
}

const listingThumbnail = (listing: IListing) => {
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
          <Image src={listingImage} alt={listing.name} fluid />
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
              <h3>{listing.name}</h3>
            </Link>
          </Col>
        </Row>
        <br />
        <Row className="align-items-end">
          {/* Delete */}
          <Col xs={4} md={3}>
            <Link
              to={`/listings/${listing.id}`}
              className="text-decoration-none text-dark"
            >
              <h6>Delete</h6>
            </Link>
          </Col>
          {/* Quantity */}
          <Col xs={3}>
            <Dropdown className="float-right">
              <Dropdown.Toggle variant="outline-dark" size="sm" id="dropdown-basic">
                {listing.quantity}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {quantities.map((quantity) => (
                  <Dropdown.Item key={quantity} href="/cart">
                    {quantity}
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
};


const CartListing: React.SFC<IProps> = (props) => {
  const { listing } = props;
  return (
    listingThumbnail(listing)
  );
};

export default CartListing;

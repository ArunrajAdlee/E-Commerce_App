import React from 'react';
import {
  Row, Col, Spinner, Image,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export interface Listing {
 id: number;
 name: string;
 image: string;
 price: number;
}

interface IProps {
  listings: Listing[];
}

interface IStates {

}

function listingThumbnail(listing: Listing) {
  let listingImage = 'https://3.bp.blogspot.com/-XB85UD145qE/V5buf22iv2I/AAAAAAAAA1I/8LBmpwNX-rU7ZjzrHOS2b0F_Pj0xqpHIQCLcB/s1600/nia.png';
  if (listing.image) {
    listingImage = listing.image;
  }

  let listingPrice = 'Price is unavailable';
  if (listing.price) {
    listingPrice = `${listing.price}`;
  }

  return (
    <Col lg={4} md={6} className="pb-5">
      <div>
        {/* Link to listing view */}
        <Link to={`/listing/${listing.name}`} className="text-decoration-none text-dark">
          <Image
            src={listingImage}
            alt={listing.name}
            fluid
          />
          <div>
            <h5 className="pt-2">{listing.name}</h5>
            <div>
              <h6>{listingPrice}</h6>
            </div>
          </div>
        </Link>
      </div>
    </Col>
  );
}

class Listings extends React.Component<IProps, IStates> {
  public readonly state: Readonly<IStates> = {
  };

  public render() {
    const { listings } = this.props;
    return (
      <>
        {listings.length ? (
          <Row className="pt-5">
            {
                 listings.map((listing) => (
                   listingThumbnail(listing)))
              }
          </Row>
        )
          : <Spinner animation="border" variant="warning" />}
      </>
    );
  }
}

export default Listings;

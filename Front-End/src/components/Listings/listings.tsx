import React from 'react';
import {
  Row, Col, Spinner, Image,
} from 'react-bootstrap';

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
  return (
    <Col lg={4} md={6} className="pb-5">
      <div>
        <Image
          src="http://maydayrooms.org/wp-content/uploads/kazimir-malevich-black-square.jpg"
          height="120px"
          width="120px"
          alt={listing.name}
          fluid
        />
        <div>
          <h5>{listing.name}</h5>
          <div>
            <h6>
              $0.00
              {listing.price}
            </h6>
          </div>
        </div>
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

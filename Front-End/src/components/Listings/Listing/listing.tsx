/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Image } from 'react-bootstrap';

export interface IListing {
    id: number;
    name: string;
    thumbnail: string;
    image: string;
    price: number;
    quantity: number;
    title: string;
    isAvailable: boolean;
}

interface IProps {
    listing: IListing;
}


// Displays if listing is available or unavailable
const listingStatus = (listing: IListing) => {
  let listingPrice: any = `$${listing.price}`;
  let textColor = 'text-dark';

  if (!listing.isAvailable) {
    listingPrice = 'Unavailable';
    textColor = 'text-danger';
  }

  return <h6 className={textColor}>{listingPrice}</h6>;
};

const listingThumbnail = (listing: IListing) => {
  // Placeholder until there is a database with an error image to point to
  let listingImage = 'https://3.bp.blogspot.com/-XB85UD145qE/V5buf22iv2I/AAAAAAAAA1I/8LBmpwNX-rU7ZjzrHOS2b0F_Pj0xqpHIQCLcB/s1600/nia.png';
  if (listing.thumbnail) {
    listingImage = listing.thumbnail;
  }

  return (
    <Col key={listing.id} lg={4} md={6} className="pb-5">
      <div>
        {/* Link to listing view */}
        <Link
          to={`/listings/${listing.id}`}
          className="text-decoration-none text-dark"
        >
          <Image src={listingImage} alt={listing.name} fluid />
          <div>
            <h5 className="pt-2">{listing.name}</h5>
            <div>{listingStatus(listing)}</div>
          </div>
        </Link>
      </div>
    </Col>
  );
};


const Listing: React.SFC<IProps> = (props) => {
  const { listing } = props;
  return (
    listingThumbnail(listing)
  );
};

export default Listing;

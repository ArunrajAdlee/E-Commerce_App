import React from 'react';
import {
  Row, Col, Spinner, Image, Pagination,
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
  currentPage: number,
  listingsPerPage: number,
}

// Returns the thumbnail of each listing in index
function listingThumbnail(listing: Listing) {
  // Placeholder until there is a database with an error image to point to
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
  constructor(props: IProps) {
    super(props);

    this.state = {
      currentPage: 1,
      listingsPerPage: 12,
    };
  }

  handlePagination = (event: any) => {
    this.setState({
      currentPage: Number(event.target.text),
    });
  };

  public render() {
    const { listings } = this.props;
    const { currentPage, listingsPerPage } = this.state;

    // Logic for displaying current listings
    const indexOfLastListing = currentPage * listingsPerPage;
    const indexOfFirstListing = indexOfLastListing - listingsPerPage;
    const currentListings = listings.slice(indexOfFirstListing, indexOfLastListing);

    // Initialize page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(listings.length / listingsPerPage); i++) {
      pageNumbers.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={this.handlePagination}>
          {i}
        </Pagination.Item>,
      );
    }

    return (
      <>
        {listings.length ? (
          <Row className="pt-5">
            { currentListings.map((listing) => (listingThumbnail(listing))) }
          </Row>
        )
          : <Spinner animation="border" variant="warning" />}
        <div>
          <Pagination className="float-right">{pageNumbers}</Pagination>
        </div>
      </>
    );
  }
}

export default Listings;

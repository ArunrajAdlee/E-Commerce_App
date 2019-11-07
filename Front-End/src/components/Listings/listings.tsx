import React from 'react';
import {
  Row, Col, Spinner, Image, Pagination,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export interface Listing {
  id: number;
  name: string;
  thumbnail: string;
  image: string;
  price: number;
  isAvailable: boolean;
}

interface IProps {
  listings: Listing[];
}

interface IStates {
  currentPage: number;
  listingsPerPage: number;
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
    if (event.target.text !== undefined) {
      this.setState({
        currentPage: Number(event.target.text),
      });
    }
  };

  // Displays if listing is available or unavailable
  listingStatus = (listing: Listing) => {
    let listingPrice: any = listing.price;
    let textColor = 'text-dark';

    if (!listing.isAvailable) {
      listingPrice = 'Unavailable';
      textColor = 'text-danger';
    }

    return <h6 className={textColor}>{listingPrice}</h6>;
  };

  // Returns the thumbnail of each listing in index
  listingThumbnail = (listing: Listing) => {
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
            to={`/listing/${listing.id}`}
            className="text-decoration-none text-dark"
          >
            <Image src={listingImage} alt={listing.name} fluid />
            <div>
              <h5 className="pt-2">{listing.name}</h5>
              <div>{this.listingStatus(listing)}</div>
            </div>
          </Link>
        </div>
      </Col>
    );
  };

  public render() {
    const { listings } = this.props;
    const { currentPage, listingsPerPage } = this.state;

    // Logic for displaying current listings
    const indexOfLastListing = currentPage * listingsPerPage;
    const indexOfFirstListing = indexOfLastListing - listingsPerPage;
    const currentListings = listings.slice(
      indexOfFirstListing,
      indexOfLastListing,
    );

    // Initialize page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(listings.length / listingsPerPage); i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={this.handlePagination}
        >
          {i}
        </Pagination.Item>,
      );
    }

    return (
      <>
        {listings.length ? (
          <Row className="pt-5">
            {currentListings.map((listing) => this.listingThumbnail(listing))}
          </Row>
        ) : (
          <Spinner animation="border" variant="warning" />
        )}
        <div>
          <Pagination className="float-right">{pageNumbers}</Pagination>
        </div>
      </>
    );
  }
}

export default Listings;
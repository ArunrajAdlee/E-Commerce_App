import React from 'react';
import {
  Row, Col, Spinner, Image, Pagination, Jumbotron,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Filters, { IFilters } from './Filters/filters';

export interface Listing {
  id: number;
  name: string;
  thumbnail: string;
  image: string;
  price: number;
  quantity: number;
  isAvailable: boolean;
}

interface IProps {
  listings: Listing[];
  isLoading: boolean;
}

interface IStates {
  filteredListings: Listing[] | null;
  currentPage: number;
  listingsPerPage: number;
}

class Listings extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      filteredListings: null,
      currentPage: 1,
      listingsPerPage: 12,
    };
  }

  public componentDidUpdate = (prevProps: IProps) => {
    if (prevProps.listings !== this.props.listings) {
      this.setState({ filteredListings: null });
    }
  };

  private handlePagination = (event: any) => {
    if (event.target.text !== undefined) {
      this.setState({
        currentPage: Number(event.target.text),
      });
    }
  };

  // Displays if listing is available or unavailable
  private listingStatus = (listing: Listing) => {
    let listingPrice: any = `$${listing.price}`;
    let textColor = 'text-dark';

    if (!listing.isAvailable) {
      listingPrice = 'Unavailable';
      textColor = 'text-danger';
    }

    return <h6 className={textColor}>{listingPrice}</h6>;
  };

  // Returns the thumbnail of each listing in index
  private listingThumbnail = (listing: Listing) => {
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

  private onFilterChanged = (filterObj: IFilters) => {
    const { listings } = this.props;
    const filteredListings: Listing[] = listings.filter((listing) => listing.price >= filterObj.minPrice && listing.price <= filterObj.maxPrice);
    if (filterObj.sortBy === 'ASC') {
      filteredListings.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filterObj.sortBy === 'DESC') {
      filteredListings.sort((a, b) => b.name.localeCompare(a.name));
    }
    this.setState({ filteredListings, currentPage: 1 });
  }


  public render() {
    let { listings, isLoading } = this.props;
    const { currentPage, listingsPerPage, filteredListings } = this.state;

    if (filteredListings) { listings = filteredListings; }

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
      <div className="mt-5">
        {
      !isLoading ? (
        <Row className="listings-container">
          <Col md={3}>
            <Filters filterChanged={this.onFilterChanged} />
          </Col>
          <Col md={9}>
            {listings.length ? (
              <>
                <Row>
                  {currentListings.map((listing) => this.listingThumbnail(listing))}
                </Row>
                <div className="pagination-container">
                  <Pagination className="float-right">{pageNumbers}</Pagination>
                </div>
              </>
            ) : (
              <Jumbotron>
                <h1>No products fit the provided criteria!</h1>
              </Jumbotron>
            )}
          </Col>
        </Row>
      )
        : <Spinner animation="border" variant="warning" />
        }
      </div>

    );
  }
}

export default Listings;

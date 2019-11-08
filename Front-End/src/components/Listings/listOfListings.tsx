import React from 'react';
import {
  Row, Col, Spinner, Pagination, Jumbotron, Badge,
} from 'react-bootstrap';
import Filters, { SortTypes } from './Filters/filters';
import Listing, { IListing } from './Listing/listing';

interface IProps {
  listings: IListing[];
  isLoading: boolean;
}

interface IStates {
  currentFilters: IFilterObj;
  filteredListings: IListing[] | null;
  currentPage: number;
  listingsPerPage: number;
  isFiltered: boolean;
}

interface IFilterObj {
  minPrice: { display: string, value: number },
  maxPrice: { display: string, value: number },
  sortBy: { display: string, value: SortTypes },
  [key: string]: any;
}

const defualtFilterObj : IFilterObj = {
  minPrice: { display: 'Min Price', value: 0 },
  maxPrice: { display: 'Max Price', value: 10000 },
  sortBy: { display: 'Sort By', value: 'NONE' },
};

class ListOfListings extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isFiltered: false,
      currentFilters: defualtFilterObj,
      filteredListings: null,
      currentPage: 1,
      listingsPerPage: 9,
    };
  }

  public componentDidUpdate = (prevProps: IProps) => {
    if (prevProps.listings !== this.props.listings) {
      this.resetFilter();
    }
  };

  private handlePagination = (event: any) => {
    if (event.target.text !== undefined) {
      this.setState({
        currentPage: Number(event.target.text),
      });
    }
  };

  private resetFilter = () => {
    this.setState({ filteredListings: null, currentFilters: defualtFilterObj, isFiltered: false });
  }

  private onFilterChanged = (filterObj: any) => {
    const { listings } = this.props;

    const filteredListings: IListing[] = listings.filter((listing) => listing.price >= filterObj.minPrice.value && listing.price <= filterObj.maxPrice.value);
    if (filterObj.sortBy.value === 'ASC') {
      filteredListings.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filterObj.sortBy.value === 'DESC') {
      filteredListings.sort((a, b) => b.name.localeCompare(a.name));
    }
    this.setState({
      filteredListings, currentPage: 1, currentFilters: filterObj, isFiltered: true,
    });
  }


  public render() {
    let { listings, isLoading } = this.props;
    const {
      currentPage, listingsPerPage, filteredListings, currentFilters, isFiltered,
    } = this.state;

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
            <Filters onFilterChanged={this.onFilterChanged} onResetFilter={this.resetFilter} />
          </Col>
          <Col md={9}>
            {listings.length ? (
              <>
                <div className="pagination-container mb-5">
                  {isFiltered
                    ? Object.keys(currentFilters).map((filter: any, index: number) => (
                      <Badge className="mr-3 styled-button" key={index} pill variant="primary">
                        {`${currentFilters[filter].display}: ${currentFilters[filter].value} `}
                      </Badge>
                    )) : null}
                  <Pagination className="float-right">{pageNumbers}</Pagination>
                </div>
                <Row>
                  {currentListings.map((listing) => <Listing key={listing.id} listing={listing} />)}
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

export default ListOfListings;

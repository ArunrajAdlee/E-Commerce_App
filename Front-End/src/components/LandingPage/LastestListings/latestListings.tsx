import React from 'react';
import axios from 'axios';
import { Row, Col, Spinner } from 'react-bootstrap';
import Listing, { IListing } from '../../Listings/Listing/listing';

interface IStates {
  listings: IListing[];
  isLoading: boolean,
}

const BACKEND_URL = 'http://localhost:4000';

class LatestListings extends React.Component<{}, IStates> {
  public readonly state: Readonly<IStates> = {
    isLoading: true,
    listings: [],
  }

  public async componentDidMount() {
    const result = await axios.get(`${BACKEND_URL}/listings`);
    let resListings: IListing[] = result.data.listings.map((product: any) => ({
      id: product.id,
      name: product.title,
      image: product.image,
      thumbnail: product.thumbnail,
      price: product.price,
      quantity: product.stock_count,
      isAvailable: product.status,
    }));

    resListings = resListings.slice(0, 6);

    this.setState({
      isLoading: false,
      listings: resListings,
    });
  }

  public render() {
    const { listings, isLoading } = this.state;
    return (
      <>
        <h2>Latest Listings</h2>
        <p>Check out the most recent products put on sale</p>
        { !isLoading
          ? (
            <Row>
              {
                 listings.map((listing) => <Listing listing={listing} />)
                }
            </Row>
          )
          : <Spinner animation="border" variant="warning" />}
      </>
    );
  }
}

export default LatestListings;

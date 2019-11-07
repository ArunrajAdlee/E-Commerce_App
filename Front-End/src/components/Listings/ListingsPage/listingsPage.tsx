import React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import Listings, { Listing } from '../listings';

const BACKEND_URL = 'http://localhost:4000';

interface IStates {
  listings: Listing[];
  isLoading: boolean;
}

interface IProps extends RouteComponentProps<any> {}

// Will finish when listings component is completed
class ListingsPage extends React.Component<IProps, IStates> {
  public readonly state: Readonly<IStates> = {
    listings: [],
    isLoading: true,
  };

  public async componentDidMount() {
    const result = await axios.get(`${BACKEND_URL}/listings`);
    const resListings: Listing[] = result.data.listings.map((product: any) => ({
      id: product.id,
      name: product.title,
      image: product.image,
      thumbnail: product.thumbnail,
      price: product.price,
      quantity: product.stock_count,
      isAvailable: product.status,
    }));

    this.setState({
      isLoading: false,
      listings: resListings,
    });
  }

  public render() {
    const { listings, isLoading } = this.state;
    return (
      <>
        <h2>All Listings</h2>
        <Listings listings={listings} isLoading={isLoading} />
      </>
    );
  }
}

export default ListingsPage;

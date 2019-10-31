import React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import Listings, { Listing } from '../listings';

const BACKEND_URL = 'http://localhost:4000';

interface IStates {
    listings: Listing[];
}

interface IProps extends RouteComponentProps<any> {}

// Will finish when listings component is completed
class ListingsPage extends React.Component<IProps, IStates> {
  public readonly state: Readonly<IStates> = {
    listings: [],
  };

  public async componentDidMount() {
    const result = await axios.get(`${BACKEND_URL}/listings`);
    const resListings: Listing[] = result.data.listings.map((product: any) => ({
      id: product.id,
      name: product.title,
    }));

    this.setState({
      listings: resListings,
    });
  }
  
  public render() {
    const { listings } = this.state;
    return (
      <>
        <h2>
          {'All Listings'}
        </h2>
        <Listings listings={listings} />
      </>
    );
  }
}

export default ListingsPage;

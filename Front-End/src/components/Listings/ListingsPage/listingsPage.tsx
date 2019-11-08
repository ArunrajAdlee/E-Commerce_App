import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { server, api } from '../../../server';
import Listings, { Listing } from '../listings';

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
    const result = await server.get(api.listings);
    const resListings: Listing[] = result.data.listings.map((product: any) => ({
      id: product.id,
      name: product.title,
      image: product.image,
      thumbnail: product.thumbnail,
    }));

    this.setState({
      listings: resListings,
    });
  }

  public render() {
    const { listings } = this.state;
    return (
      <>
        <h2>All Listings</h2>
        <Listings listings={listings} />
      </>
    );
  }
}

export default ListingsPage;

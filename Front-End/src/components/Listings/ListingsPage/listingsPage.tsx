import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { server, api } from '../../../server';
import { IListing } from '../Listing/listing';
import ListOfListings from '../listOfListings';

interface IStates {
  listings: IListing[];
  isLoading: boolean;
}

interface IProps extends RouteComponentProps<any> {}

class ListingsPage extends React.Component<IProps, IStates> {
  public readonly state: Readonly<IStates> = {
    listings: [],
    isLoading: true,
  };

  public async componentDidMount() {
    const result = await server.get(api.listings);
    const resListings: IListing[] = result.data.listings.map((product: any) => ({
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
        <ListOfListings listings={listings} isLoading={isLoading} />
      </>
    );
  }
}

export default ListingsPage;

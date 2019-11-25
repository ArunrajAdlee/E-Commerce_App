import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { server, api } from '../../../server';
import { IListing } from '../Listing/listing';
import ListOfListings from '../listOfListings';


interface IStates {
  listings: IListing[];
  searchQuery: string;
  isLoading: boolean;
}

interface IProps extends RouteComponentProps<any> {}

// Will finish when listings component is completed
class SearchPage extends React.Component<IProps, IStates> {
  public readonly state: Readonly<IStates> = {
    listings: [],
    searchQuery: '',
    isLoading: true,
  };

  public async componentDidMount() {
    this.updateListing();
  }

  public async componentDidUpdate() {
    const { searchQuery } = this.state;
    const { match } = this.props;
    if (searchQuery !== match.params.searchQuery) {
      this.updateListing();
    }
  }

  private updateListing = async () => {
    const { match } = this.props;
    const { searchQuery } = match.params;
    const result = await server.get(
      `${api.listings_search}${searchQuery}`,
    );
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
      searchQuery: searchQuery.replace('+', ' '),
      listings: resListings,
    });
  };

  public render() {
    const { searchQuery, listings, isLoading } = this.state;
    return (
      <>
        <h2>{`Search: ${searchQuery}`}</h2>
        <ListOfListings listings={listings} isLoading={isLoading} />
      </>
    );
  }
}

export default SearchPage;

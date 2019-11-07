import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { server, api } from '../../../server';
import Listings, { Listing } from '../listings';


interface IStates {
  listings: Listing[];
  searchQuery: string;
}

interface IProps extends RouteComponentProps<any> {}

// Will finish when listings component is completed
class SearchPage extends React.Component<IProps, IStates> {
  public readonly state: Readonly<IStates> = {
    listings: [],
    searchQuery: '',
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
    const resListings: Listing[] = result.data.listings.map((product: any) => ({
      id: product.id,
      name: product.title,
      image: product.image,
      thumbnail: product.thumbnail,
    }));
    this.setState({
      searchQuery: searchQuery.replace('+', ' '),
      listings: resListings,
    });
  };

  public render() {
    const { searchQuery, listings } = this.state;
    return (
      <>
        <h2>{`Search: ${searchQuery}`}</h2>
        <Listings listings={listings} />
      </>
    );
  }
}

export default SearchPage;

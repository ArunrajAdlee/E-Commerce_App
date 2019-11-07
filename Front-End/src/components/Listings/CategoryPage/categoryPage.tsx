import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { server, api } from '../../../server';
import Listings, { Listing } from '../listings';

interface IStates {
  listings: Listing[];
  categoryId: number;
  categoryName: string;
}

interface IProps extends RouteComponentProps<any> {}

// Will finish when listings component is completed
class CategoryPage extends React.Component<IProps, IStates> {
  public readonly state: Readonly<IStates> = {
    listings: [],
    categoryId: -1,
    categoryName: '',
  };

  public async componentDidMount() {
    this.updateListing();
  }

  public async componentDidUpdate(prevProps: IProps) {
    const { match } = this.props;
    if (prevProps.match.params.categoryId !== match.params.categoryId) {
      this.updateListing();
    }
  }

  private updateListing = async () => {
    const { match } = this.props;
    const { categoryId } = match.params;
    const result = await server.get(
      `${api.listings_category}${categoryId}`,
    );
    const resListings: Listing[] = result.data.listings.map((product: any) => ({
      id: product.id,
      name: product.title,
      image: product.image,
      thumbnail: product.thumbnail,
    }));

    this.setState({
      categoryId: match.params.categoryId,
      categoryName: match.params.categoryName,
      listings: resListings,
    });
  };

  public render() {
    const { categoryName, listings } = this.state;
    console.log('we in ');
    return (
      <>
        <h2>{`Category: ${categoryName}`}</h2>
        <Listings listings={listings} />
      </>
    );
  }
}

export default CategoryPage;

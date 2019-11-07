import React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import Listings, { Listing } from '../listings';

const BACKEND_URL = 'http://localhost:4000';

interface IStates {
  listings: Listing[];
  categoryId: number;
  categoryName: string;
  isLoading: boolean;
}

interface IProps extends RouteComponentProps<any> {}

// Will finish when listings component is completed
class CategoryPage extends React.Component<IProps, IStates> {
  public readonly state: Readonly<IStates> = {
    listings: [],
    categoryId: -1,
    categoryName: '',
    isLoading: true,
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
    const result = await axios.get(
      `${BACKEND_URL}/listings/category/${categoryId}`,
    );

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
      categoryId: match.params.categoryId,
      categoryName: match.params.categoryName,
      listings: resListings,
    });
  };

  public render() {
    const { categoryName, listings, isLoading } = this.state;
    return (
      <>
        <h2>{`Category: ${categoryName}`}</h2>
        <Listings listings={listings} isLoading={isLoading} />
      </>
    );
  }
}

export default CategoryPage;

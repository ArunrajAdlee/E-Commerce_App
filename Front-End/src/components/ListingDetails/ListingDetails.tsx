import React from 'react';
import Media from 'react-bootstrap/Media';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faStar as fasFaStar,
} from '@fortawesome/free-solid-svg-icons';
import {
  faStar as farFaStar,
} from '@fortawesome/free-regular-svg-icons';
import ErrorAlert from '../Misc/errorAlert';
import { server, api } from '../../server';
import { StoreContext } from '../../store';

library.add(fasFaStar, farFaStar);

export interface IListingDetails {
  id: number,
  description: string,
  image: string,
  price: number,
  quantity_sold: number,
  status: boolean,
  stock_count: number,
  thumbnail: string,
  title: string,
  user_id: number,
  category: number,
  category_name: string,
  username: string,

}

interface IReviewDetails {
  title: string,
  description: string,
  rating: number,
  seller_id: number,
  user_id: number,
}

interface IProps extends RouteComponentProps<any> {}

interface IStates {
  listing: IListingDetails | null;
  quantity: number;
  reviews: IReviewDetails[];
  overallReview: number;
  numReviews: number;
  error: boolean,
  noStockError: boolean,
}

class ListingDetails extends React.Component<IProps, IStates> {
  public readonly state: Readonly<IStates> = {
    listing: null,
    quantity: 1,
    reviews: [],
    overallReview: 0,
    numReviews: 0,
    error: false,
    noStockError: false,
  };

  public async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    await this.getListingDetails(id);
  }

  public async componentDidUpdate(prevProps: IProps) {
    const { match } = this.props;
    const { id } = match.params;
    if (id !== prevProps.match.params.id) {
      await this.getListingDetails(id);
    }
  }

  public getListingDetails = async (ID: number) => {
    try {
      const resp = await server.get(
        `${api.listings_details}${ID}`,
      );
      if (resp.data.listing) {
        this.setState({
          listing: resp.data.listing,
        });
        const { user_id } = resp.data.listing;

        const reviewResp = await server.get(
          `${api.reviews}${user_id}`,
        );

        if (reviewResp.data.reviews) {
          let overallRating = 0;

          for (let i = 0; i < reviewResp.data.reviews.length - 1; i++) {
            overallRating += reviewResp.data.reviews[i].rating;
          }

          overallRating /= reviewResp.data.reviews.length;

          this.setState({
            reviews: reviewResp.data.reviews,
            overallReview: overallRating,
            numReviews: reviewResp.data.reviews.length,
          });
        }
      }
    } catch (e) {
      this.setState({ error: true });
    }
  }

  public onAddToCart = async () => {
    const { quantity, listing } = this.state;
    const { history } = this.props;
    const { isAuth } = this.context;

    if (!isAuth) {
      history.push('/login');
    } else {
      try {
        if (listing!.stock_count < quantity || quantity <= 0) {
          throw 'Quantity desired is more than that in stock';
        }
        const res = await server.post('/cart', { listing_id: listing!.id, quantity });
        history.push('/cart');
      } catch (e) {
        if (e === 'Quantity desired is more than that in stock') this.setState({ noStockError: true });
      }
    }
  };

  public render() {
    const {
      listing, error, reviews, overallReview, numReviews, noStockError,
    } = this.state;
    return (
      listing
        ? (
          <div className="listing-details">
            <ErrorAlert msg="Listing could not be added to your cart. Please select an available quantity." isError={noStockError} onCloseError={() => this.setState({ noStockError: false })} />
            <Media>
              <Container>
                <Row className="mb-5">
                  <Col sm={12} lg={6} className="image-container">
                    <Image className="image" src={listing.image} fluid />
                  </Col>
                  <Col sm={12} lg={6}>
                    <Media.Body>
                      <div className="purchase-details">
                        <h3>{listing.title}</h3>
                        <h5>
                          Sold By:
                          {' '}
                          <Link to={`/user/${listing.username}`}>{listing.username}</Link>
                          {' '}
                          <Rating
                            initialRating={overallReview}
                            emptySymbol={<FontAwesomeIcon icon={farFaStar} className="text-warning" />}
                            readonly
                            fullSymbol={<FontAwesomeIcon icon={fasFaStar} className="text-warning" />}
                          />
                          <p className="text-muted">
                            {`${numReviews} reviews `}
                          </p>
                        </h5>
                        <h4 className="listing-price">
                          {`$${listing.price}`}
                        </h4>
                        <p className="mt-4">{`Category: ${listing.category_name}`}</p>
                        <p>{`Available Quantity: ${listing.stock_count}`}</p>
                        <hr />
                        <p className="mb-5">{listing.description}</p>
                        Quantity:
                        <input type="number" className="ml-3 styled-input" onKeyDown={() => false} onChange={(e:any) => { this.setState({ quantity: e.target.value }); }} max={listing.stock_count} min={1} defaultValue={1} />
                        <br />
                        <Button variant="warning" className="styled-button mt-4" onClick={this.onAddToCart}>ADD TO CART</Button>
                      </div>
                    </Media.Body>
                  </Col>
                </Row>
                <Row className="review" />
                <Row className="review">
                  <Col />
                  <Col>
                    <h4> Reviews </h4>
                  </Col>
                </Row>
                <Row className="review" />
                <Row className="reviewBorder">
                  <ul>
                    <li>
                      <br />
                    </li>
                    {reviews.map((r, index) => (
                      <li key={index}>
                        <h5>
                          {`${r.title}  `}
                        </h5>
                        <Rating
                          initialRating={r.rating}
                          emptySymbol={<FontAwesomeIcon icon={farFaStar} className="text-warning" size="sm" />}
                          readonly
                          fullSymbol={<FontAwesomeIcon icon={fasFaStar} className="text-warning" size="sm" />}
                        />
                        <p />
                        <p className="text-muted">
                          {' '}
                          {r.description}
                        </p>
                        <br />
                      </li>
                    ))}
                  </ul>
                </Row>
              </Container>
            </Media>

          </div>
        )
        : error
          ? <span>This listing does not exist!</span>
          : <Spinner animation="border" variant="warning" />
    );
  }
}

ListingDetails.contextType = StoreContext;
export default ListingDetails;

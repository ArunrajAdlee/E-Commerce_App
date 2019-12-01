import React from 'react';
import Media from 'react-bootstrap/Media';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { server, api } from '../../server';
import * as Yup from 'yup';
import {
  Formik, Field, Form, ErrorMessage, FormikValues,
} from 'formik';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHeart as fasFaHeart,
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as farFaHeart,
} from '@fortawesome/free-regular-svg-icons';
library.add(fasFaHeart, farFaHeart)


interface IListingDetails {
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

export interface FormFields {
  user_id: number,
  seller_id: number,
  listing_id: number,
  title: string,
  description: string,
  rating: number,

}

interface IProps extends RouteComponentProps<any> {}

interface IStates {
  listing: IListingDetails | null;
  quantity: number;
  reviews: IReviewDetails[];
  error: boolean,
}

const ReviewSchema = Yup.object().shape({
  title: Yup.string()
    .max(50, 'You\'ve reached the character limit')
    .required('Title is required'),
  description: Yup.string()
    .max(400, 'The description is over the character limit (400)')
    .required('Description is required'),
    rating: Yup.number()
      .typeError('Please add a rating')
      .required('Please add a rating'),
});

class ListingDetails extends React.Component<IProps, IStates> {

  public readonly state: Readonly<IStates> = {
    listing: null,
    quantity: 1,
    reviews: [],
    error: false,
  };

  public async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const user_id = 5;

    try {
      const resp = await server.get(
        `${api.listings_details}${id}`,
      );
      if (resp.data.listing) {
        this.setState({
          listing: resp.data.listing,
        });
      }

      const reviewResp = await server.get(
        `${api.reviews}${user_id}`,
      );
      if(reviewResp.data.reviews){
        this.setState({
          reviews: resp.data.reviews,
        });
      }

    } catch (e) {
      this.setState({ error: true });
    }
  }

  public onAddToCart = () => {
    const { quantity, listing } = this.state;

    // API STUFF FOR ADDING TO THE ITEM TO USER'S CART
  }

  private handleSubmit = async (values: FormikValues, actions: any) => {
    await server.post(api.reviews_post, values);
  }


  public render() {
    const { listing, error } = this.state;
    return (
      listing
        ? (
          <div className="listing-details">
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
                <Row className="mt-5">
                <ul>
                  <li>
                  <h3> Reviews </h3>
                  <br />
                  </li>
                  {this.state.reviews.map(r => (
                    <li>
                    <h5>{r.title} {' '}
                    <Rating
                    initialRating = {r.rating}
                    emptySymbol={<FontAwesomeIcon icon={farFaHeart} />}
                    readonly = {true}
                    fullSymbol={<FontAwesomeIcon icon={fasFaHeart} />}
                    />
                    </h5>
                    <p> {r.description}</p>
                    </li>
                    ))}
                  </ul>
                </Row>




                <Formik
                  initialValues={
                  {
                    user_id: 5,
                    seller_id: 5,
                    listing_id: 28,
                    title: '',
                    description: '',
                    rating: -1,
                  }
                  }
                  validationSchema={ReviewSchema}
                  onSubmit={(values: FormikValues, actions: any) => {
                    actions.setSubmitting(true);
                    this.handleSubmit(values, actions);
                  }}
                >
                  {({ touched, errors, isSubmitting }) => (
                    <Form>
                          <Row>
                            <Col lg={2}>
                              <label htmlFor="title">Review Title*</label>
                            </Col>
                            <Col lg={9}>
                              <Field
                                name="title"
                                className={`form-control styled-input listing-input ${
                                  touched.title && errors.title ? 'is-invalid' : ''
                                }`}
                              />
                              <ErrorMessage
                                component="div"
                                name="title"
                                className="invalid-feedback"
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col lg={2}>
                              <label htmlFor="description">Review Text*</label>
                            </Col>
                            <Col lg={9}>
                              <Field
                                component="textarea"
                                style={{ height: '100px' }}
                                name="description"
                                className={`form-control styled-input listing-input ${
                                  touched.description && errors.description ? 'is-invalid' : ''
                                }`}
                              />
                              <ErrorMessage
                                component="div"
                                name="description"
                                className="invalid-feedback"
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col lg={2}>
                              <label htmlFor="description">Seller Rating*</label>
                            </Col>
                            <Col lg={9}>
                              <Field
                              component="select"
                              name = "rating"
                              className={`form-control styled-input listing-input ${
                                touched.rating && errors.rating ? 'is-invalid' : ''
                              }`}>
                              <option value=""> -- select a rating -- </option>
                              <option value = "1"> 1 </option>
                              <option value = "2"> 2 </option>
                              <option value = "3"> 3 </option>
                              <option value = "4"> 4 </option>
                              <option value = "5"> 5 </option>
                              </Field>
                              <ErrorMessage
                                component="div"
                                name="rating"
                                className="invalid-feedback"
                              />
                            </Col>


                          </Row>

                          <Button
                            type="submit"
                            className="btn styled-button post"
                            disabled={isSubmitting}
                            variant="warning"
                          >
                            {isSubmitting ? 'Please wait...' : 'Post'}
                          </Button>
                    </Form>
                  )}
                </Formik>

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

export default ListingDetails;

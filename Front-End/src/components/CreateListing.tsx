import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Row, Col, Button, Alert, Image,
} from 'react-bootstrap';
import {
  Formik, Field, Form, ErrorMessage, FormikValues,
} from 'formik';
import * as Yup from 'yup';
import { RouteComponentProps } from 'react-router';
import { server, api } from '../server';


export interface FormFields {
  image: File,
  title: string,
  description: string,
  category: number,
  price: number,
  stock_count: number,
}

interface Category {
    id: number;
    name: string;
}

interface IStates {
  categories: Category[],
  isError: boolean;
  imagePreview: string;
}

interface IProps extends RouteComponentProps {}

// Will finish when yup ain't broke
const validImageFormat = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const ListingSchema = Yup.object().shape({
  image: Yup.mixed(),
  title: Yup.string()
    .max(50, 'Please pick a shorter title')
    .required('Title is required'),
  description: Yup.string()
    .max(100, 'The description is over the character limit (100)')
    .required('Description is required'),
  category: Yup.number()
    .typeError('Please pick a category')
    .required('Please pick a category'),
  price: Yup.number()
    .typeError('Price must be a number')
    .required('Please enter a price')
    .positive('Price should be positive and greater than 0'),
  stock_count: Yup.number()
    .typeError('Quantity must be a number')
    .required('Please enter a stock_count')
    .moreThan(0.99, 'The minimum stock_count is 1')
    .integer('Quantity must be a whole number'),
});

let imageFile: any;

class CreateListing extends React.Component<IProps, IStates> {
  public readonly state: Readonly<IStates> = {
    categories: [],
    isError: false,
    imagePreview: '',
  }

  public async componentDidMount() {
    const result = await server.get(api.categories);
    this.setState({ categories: result.data });
  }

  private onChangeHandler = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      imageFile = event.target.files[0];
      const objUrl = URL.createObjectURL(event.target.files[0]);
      this.setState({
        imagePreview: objUrl,
      });
    }
  }

  private handleSubmit = async (values: FormikValues, actions: any) => {
    const { history } = this.props;

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('title', values.title);
    formData.append('category', values.category);
    formData.append('description', values.description);
    formData.append('price', values.price);
    formData.append('stock_count', values.stock_count);

    const resp = await server.post(api.listings, formData);
    if (resp.data.listing) {
      const route = `/listings/${resp.data.listing.id}`;
      history.push(route);
    }
  }

  public render() {
    const { categories, isError, imagePreview } = this.state;
    return (
      <Formik
        initialValues={
        {
          image: undefined,
          title: '',
          description: '',
          category: undefined,
          price: '',
          stock_count: '',
        }
        }
        validationSchema={ListingSchema}
        onSubmit={(values: FormikValues, actions: any) => {
          actions.setSubmitting(true);
          this.handleSubmit(values, actions);
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <Row>
              <Col xl="6" className="mb-5">
                <h5> Photos </h5>
                <p> Please choose a good quality photo to showcase your product. </p>
                <Field
                  onChange={this.onChangeHandler}
                  type="file"
                  name="image"
                  className={`form-control styled-input listing-input ${
                    touched.image && errors.image ? 'is-invalid' : ''
                  }`}
                />
                <ErrorMessage
                  component="div"
                  name="image"
                  className="invalid-feedback"
                />
              </Col>
              <Col lg="6">
                <h5> Image Preview </h5>
                <p> Note: Photo will be scaled appropriately </p>
                <div className="small-prev-container">
                  <Image id="target" src={imagePreview} alt="" />
                </div>
                <div className="big-prev-container">
                  <Image id="target" src={imagePreview} alt="" />
                </div>
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col xl={6} className="mb-5">
                <h5> Listing Details </h5>
                <br />
                <Row>
                  <Col lg={2}>
                    <label htmlFor="title">Title*</label>
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
                <Row>
                  <Col className="text-muted" lg={{ offset: 2 }}>
                   Add a short title for your listing.
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg={2}>
                    <label htmlFor="description">Description*</label>
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
                  <Col className="text-muted" lg={{ offset: 2 }}>
                  Add a short description of your product (100 characters max).
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg={2}>
                    <label htmlFor="category">Category*</label>
                  </Col>
                  <Col lg={9}>
                    <Field
                      component="select"
                      name="category"
                      className={`form-control styled-input listing-input ${
                        touched.category && errors.category ? 'is-invalid' : ''
                      }`}
                    >
                      <option value=""> -- select a category -- </option>
                      {categories.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
                    </Field>
                    <ErrorMessage
                      component="div"
                      name="category"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="text-muted" lg={{ offset: 2 }}>
                   Please pick 1 category that matches your product.
                  </Col>
                </Row>
              </Col>
              <Col xl={6}>
                <h5> Inventory and Pricing </h5>
                <br />
                <Row>
                  <Col lg={2}>
                    <label htmlFor="price">Product Price*</label>
                  </Col>
                  <Col lg={9}>
                    <Field
                      name="price"
                      type="number"
                      className={`form-control styled-input listing-input ${
                        touched.price && errors.price ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="price"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="text-muted" lg={{ offset: 2 }}>
                    Enter the price before tax.
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg={2}>
                    <label htmlFor="stock_count">Quantity*</label>
                  </Col>
                  <Col lg={9}>
                    <Field
                      type="number"
                      name="stock_count"
                      className={`form-control styled-input listing-input ${
                        touched.stock_count && errors.stock_count ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="stock_count"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="text-muted" lg={{ offset: 2 }}>
                   Enter your current stock count.
                  </Col>
                </Row>
              </Col>
            </Row>
            <br />
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
    );
  }
}

export default CreateListing;

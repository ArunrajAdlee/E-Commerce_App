import React from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import {Row, Col, Button, Alert} from 'react-bootstrap';
import {Formik, Field, Form, ErrorMessage, FormikValues, FormikActions} from 'formik';
import * as Yup from 'yup';

export interface FormFields {
  productName: string,
  description: string,
  price: number,
  quantity: number,
}

interface IStates {
  categories: string[],
  isError: boolean;
}

const ListingSchema = Yup.object().shape({
  productName: Yup.string()
    .max(50, 'Please pick a shorter title')
    .required('Title is required'),
  description: Yup.string()
    .max(100, 'The description is over the character limit (100)')
    .required('Description is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .required('Please enter a price')
    .positive ('Price should be positive and greater than 0'),
  quantity: Yup.number()
    .typeError('Quantity must be a number')
    .required('Please enter a quantity')
    .moreThan(0.99, 'The minimum quantity is 1')
});

class CreateListing extends React.Component<{}, IStates> {

  public readonly state: Readonly<IStates> = {
    categories: [],
    isError: false,
  }

  getCategories(){
    let temp = {}
    temp = axios.get('localhost:4000/categories');
    this.setState({categories: this.state.categories.concat("Cars")})
  }

  public componentDidMount() {
    this.getCategories();
  }

  private handleSubmit = async (values: FormikValues, actions: any) => {
    
  }

  public render() {
    const { categories, isError } = this.state;
    return (
      <Formik

      initialValues={
        {
          productName: '',
          description: '',
          price: undefined,
          quantity: undefined,
        }}

        validationSchema={ListingSchema}

        onSubmit={(values: FormikValues, actions: any) => {
          actions.setSubmitting(true);
          this.handleSubmit(values, actions);
        }}
        >
        {({ touched, errors, isSubmitting }) => (
          <Form>

            <h5> Photos </h5>
            <br/>

            <h5> Listing Details </h5>
            <br/>
            <div>
            <Row>
            <Col lg = {2}> <label htmlFor="productName">Title*</label> </Col>
            <Col lg = {5}>
            <Field
            name = "productName"
            className={`form-control styled-input listing-input ${
              touched.productName && errors.productName ? "is-invalid" : ""
            }`}
            />
            <ErrorMessage
            component = "div"
            name = "productName"
            className = "invalid-feedback"
            />
            </Col>
            </Row>
            <Row>
            <Col className="text-muted" lg = {{offset: 2}}>
            Add a short title for your listing.
            </Col>
            </Row>
            </div>
            <br/>

            <div>
            <Row>
            <Col lg = {2} > <label htmlFor="description">Description*</label> </Col>
            <Col lg = {5}>
            <Field
            component = "textarea"
            style={{height: '100px'}}
            name = "description"
            className={`form-control styled-input listing-input ${
              touched.description && errors.description ? "is-invalid" : ""
            }`}
            />
            <ErrorMessage
            component = "div"
            name = "description"
            className = "invalid-feedback"
            />
            </Col>
            </Row>
            <Row>
            <Col className="text-muted" lg = {{offset: 2}}>
            Add a short description of your product (100 characters max).
            </Col>
            </Row>
            </div>
            <br/>



            <h5> Inventory and Pricing </h5>
            <br/>
            <div>
            <Row>
            <Col lg = {2}> <label htmlFor="price">Price*</label> </Col>
            <Col lg = {5}>
            <Field
            name = "price"
            className={`form-control styled-input listing-input ${
              touched.price && errors.price ? "is-invalid" : ""
            }`}
            />
            <ErrorMessage
            component = "div"
            name = "price"
            className = "invalid-feedback"
            />
            </Col>
            </Row>
            <Row>
            <Col className="text-muted" lg = {{offset: 2}}>
             Enter the price before tax.
            </Col>
            </Row>
            </div>
            <br/>

            <div>
            <Row>
            <Col lg = {2}> <label htmlFor="quantity">Quantity*</label> </Col>
            <Col lg = {5}>
            <Field
            name = "quantity"
            className={`form-control styled-input listing-input ${
              touched.quantity && errors.quantity ? "is-invalid" : ""
            }`}
            />
            <ErrorMessage
            component = "div"
            name = "quantity"
            className = "invalid-feedback"
            />
            </Col>
            </Row>
            <Row>
            <Col className="text-muted" lg = {{offset: 2}}>
             Enter your current stock count.
            </Col>
            </Row>
            </div>
            <br/>

            <Button
            type="submit"
            className="btn styled-button post"
            disabled={isSubmitting}
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

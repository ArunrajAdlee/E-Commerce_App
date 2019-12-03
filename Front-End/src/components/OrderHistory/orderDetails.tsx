import * as React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Spinner } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import OrderSummary, { IAddressObj, IOrderData } from '../Checkout/orderSummary';
import { server, api } from '../../server';
import { Link, Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Formik, Field, Form, ErrorMessage, FormikValues,
} from 'formik';

interface IOrderTotals {
  order_id: number,
  order_total_price: number,
  order_total_price_before_tax: number,
}

interface IOrderDetailsInfo {
    address_id: number,
    listings_title: string,
    order_details_listing_fee: number,
    order_details_listing_id: number,
    order_details_order_id: number,
    order_details_price_after_tax: number,
    order_details_price_before_tax: number,
    order_details_purchase_date: Date,
    order_details_quantity: number,
    order_details_seller_id: number,
}

interface IStates{
    order: IOrderTotals[],
    orderDetails: IOrderDetailsInfo[],
    address: IAddressObj;
    show: boolean,
}

export interface FormFields {
  title: string,
  description: string,
  rating: number,
  listing_id: number,

}

interface IProps extends RouteComponentProps<any> {}

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

class OrderDetails extends React.Component<IProps, IStates> {
    public readonly state: Readonly<IStates> = {
      order: [],
      orderDetails: [],
      address: {} as IAddressObj,
      show: false,
    };

    public async componentDidMount() {
      const { match, history } = this.props;
      const { id } = match.params;
      try {
        const resp = await server.get(`${api.order_details}${id}`);
        if (resp.data) {
          this.setState({
            orderDetails: resp.data.orderDetails, address: resp.data.address, order: resp.data.order,
          });
        }
      } catch (e) {
        history.push('/');
      }
    }

    public handleClose = () => {
      this.setState({ show: false });}

    public handleShow = () => {
      this.setState({ show: true});}

    private handleSubmit = async (values: FormikValues, actions: any) => {
    const { history } = this.props;

    const formData = new FormData();

    const {order} = this.state;


    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('rating', values.rating);
    formData.append('seller_id', order[values.listing_id].order_details_seller_id);

    const resp = await server.post(api.reviews_post, values);

    if (resp.data.reviews){
      const route = `/listings/${values.listing_id}`;
      history.push(route);
      }

    }

    render() {
      const { order, address, show, orderDetails } = this.state;
      return (
        order.length > 0 ? (
          <>
            <Row>
              <Col lg={6}>
                <h5>Order Info</h5>
                <hr />
                <Row>
                  <Col lg={6}>
              Order Number
                  </Col>
                  <Col lg={6}>
                    {order[0].order_id}
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
              Date
                  </Col>
                  <Col lg={6}>
                    {moment(orderDetails[0].order_details_purchase_date).format('YYYY-MM-DD')}
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
              Total
                  </Col>
                  <Col lg={6}>
                    {`$${order[0].order_total_price}`}
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
              Payment Method
                  </Col>
                  <Col lg={6}>
              Paypal
                  </Col>
                </Row>
              </Col>
              <Col lg={6}>
                <h5>Billing/Shipping Details</h5>
                <hr />
                <Row>
                  <Col lg={6}>
              Address
                  </Col>
                  <Col lg={6}>
                    {`${address.street_number} ${address.street_name}`}
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
              City
                  </Col>
                  <Col lg={6}>
                    {address.city}
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    {address.country}
                  </Col>
                  <Col lg={6}>
                    {address.postal_code}
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
              Postal Code
                  </Col>
                  <Col lg={6}>
              Paypal
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="order-summary mt-5">
              <h5>Your Order</h5>
              <hr />
              <Row>
                <Col xs={4}>
            Product
                </Col>
                <Col className="text-right" xs={4}>
            Total
                </Col>
                <Col className="text-right" xs={4}>
            Review
                </Col>
              </Row>
              <div className="order-products-container custom-scrollbar">
                {orderDetails.map((product, index) => (
                  <Row key={index}>
                    <Col xs={4}>
                      {`${product.listings_title} (${product.order_details_quantity})`}
                    </Col>
                    <Col className="text-right" xs={4}>
                      {`$${product.order_details_price_before_tax}`}
                    </Col>



                  </Row>
                ))}
              </div>
              <Row>
                <Col xs={4}>
            SUBTOTAL
                </Col>
                <Col className="text-right" xs={4}>
                  {`$${order[0].order_total_price_before_tax}`}
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
            SHIPPING
                </Col>
                <Col className="text-right" xs={4}>
            FREE!
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
                  <strong>TOTAL</strong>
                </Col>
                <Col className="text-right" xs={4}>
                  <strong>
                    {`$${order[0].order_total_price}`}
                  </strong>
                </Col>
              </Row>


              <Row>
                <Button variant="primary" onClick={() => this.handleShow()} className="btn styled-button post">
                  Review Seller
                </Button>

                <Modal show={show} onHide={this.handleClose} animation={false} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                <Modal.Title>Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Formik
                initialValues={
                  {
                    listing_id: -1,
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
          <label htmlFor="productReview">Which product would you like to review?*</label>
        </Col>
        <Col lg={9}>
          <Field
          component="select"
          name = "listing_id"
          className={`form-control styled-input listing-input ${
            touched.listing_id && errors.listing_id ? 'is-invalid' : ''
          }`}>
          <option value=""> -- select a product -- </option>
          {order.map((product, index) => <option key = {index} value={index}>{product.listings_title}</option>)}
          </Field>
          <ErrorMessage
            component="div"
            name="listing_id"
            className="invalid-feedback"
          />
        </Col>
      </Row>

            <Row>
              <Col lg={2}>
                <label htmlFor="title">Review title*</label>
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
                <label htmlFor="description">Review text*</label>
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
                <label htmlFor="description">Seller rating*</label>
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
            <br/>

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
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={this.handleClose}>
Close
</Button>
</Modal.Footer>
</Modal>
              </Row>

            </div>
          </>
        ) : ''
      );
    }
}

export default OrderDetails;

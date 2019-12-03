import React from 'react';
import {
  Row, Col, Accordion, Card, Spinner, AccordionCollapse, Modal, Alert,
} from 'react-bootstrap';
import {
  Formik, Field, Form, ErrorMessage, FormikValues, FormikActions,
} from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown, faTruck, faWalking, faRobot,
} from '@fortawesome/free-solid-svg-icons';
import { InputGroupCheckbox } from 'react-bootstrap/InputGroup';
import { RouteComponentProps } from 'react-router-dom';
import OrderSummary, { IOrderData } from './orderSummary';
import { server, api } from '../../server';
import ErrorAlert from '../Misc/errorAlert';

type ShippingType = 'Ground Shipping' | 'Pick-Up' | 'Drone Shipping';

interface IStates {
  data: IOrderData;
  render: boolean;
  shippingType: ShippingType;
  error: boolean;
  payalLoading: boolean;
}

interface IProps extends RouteComponentProps {}


const CheckoutSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Password is required')
    .max(32, 'Maximum 32 characters'),
  firstName: Yup.string()
    .required('First Name is required')
    .max(32, 'Maximum 32 characters'),
  lastName: Yup.string()
    .required('Last Name is required')
    .max(32, 'Maximum 32 characters'),
  streetName: Yup.string()
    .required('Street Name is required')
    .max(64, 'Maximum 64 characters'),
  province: Yup.string()
    .required('Province/State is required')
    .max(32, 'Maximum 32 characters'),
  city: Yup.string()
    .required('City is required')
    .max(32, 'Maximum 32 characters'),
  country: Yup.string()
    .required('Country is required')
    .max(32, 'Maximum 32 characters'),
  streetNumber: Yup.number()
    .required('Street Number is required')
    .typeError('Enter a number'),
  postalCode: Yup.string()
    .required('Postal Code is required')
    .max(8, 'Maximum 8 characters')
    .typeError('Enter a number'),
});


class Checkout extends React.Component<IProps, IStates> {
  public readonly state: Readonly<IStates> = {
    data: {} as IOrderData,
    render: false,
    shippingType: 'Ground Shipping',
    error: false,
    payalLoading: false,
  }

  public async componentDidMount() {
    const resp = await server.get(api.order_summary);
    const { history } = this.props;
    if (resp.data) {
      if (resp.data.cartItems.length <= 0) {
        history.push('/');
      } else {
        this.setState({
          data: resp.data, render: true,
        });
      }
    }
  }

  private mockPaypalTransaction = (id: number) => {
    const { history } = this.props;
    setTimeout(() => {
      history.push(`/profile/orderDetails/${id}`);
    }, 3000);
  }

  private handleShippingChange = (shippingType: ShippingType) => {
    this.setState({
      shippingType,
    });
  }

  private handleSubmit = async (values: FormikValues, actions: any) => {
    const { shippingType } = this.state;

    try {
      const formData = new FormData();
      formData.append('streetName', values.streetName);
      formData.append('streetNumber', values.streetNumber);
      formData.append('unitNumber', values.unitNumber);
      formData.append('city', values.city);
      formData.append('province', values.province);
      formData.append('postalCode', values.postalCode);
      formData.append('country', values.country);

      const addressResponse = await server.post(api.address_create, formData);

      if (addressResponse.data.address.id) {
        // eslint-disable-next-line object-shorthand
        const submissionResponse = await server.post(api.order_create, { shippingType: shippingType, addressID: addressResponse.data.address.id });
        this.setState({
          payalLoading: true,
        }, () => this.mockPaypalTransaction(submissionResponse.data.order.id));
      }
    } catch {
      this.setState({
        error: true,
      });
    }
  }

  public render() {
    const {
      data, render, shippingType, payalLoading, error,
    } = this.state;
    return (
      <>
        {render ? (
          <>
            <ErrorAlert msg="An error occured while processing your transaction! Please contact an administrator" isError={error} onCloseError={() => this.setState({ error: false })} />
            <Row>
              <Formik
                initialValues={{
                  firstName: data.userInfo.first_name, lastName: data.userInfo.last_name, province: data.userInfo.address.province, companyName: data.userInfo.brand_name, email: data.userInfo.email, streetNumber: data.userInfo.address.street_number, streetName: data.userInfo.address.street_name, unitNumber: data.userInfo.address.unit_number, city: data.userInfo.address.city, country: data.userInfo.address.country, postalCode: data.userInfo.address.postal_code, phoneNumber: data.userInfo.phone_number,
                }}
                onSubmit={(values: FormikValues, actions: any) => {
                  actions.setSubmitting(true);
                  this.handleSubmit(values, actions);
                }}
                validationSchema={CheckoutSchema}
              >
                {({ touched, errors }) => (
                  <Form className="checkout-form">
                    <Col lg={8}>
                      <Accordion defaultActiveKey="0">
                        <Card>
                          <Accordion.Toggle as={Card.Header} eventKey="0">
                            Shipping/Billing Information
                            <FontAwesomeIcon icon={faCaretDown} className="float-right" />
                          </Accordion.Toggle>
                          <Accordion.Collapse eventKey="0">
                            <Row>
                              <Col sm={12} lg={6}>
                                <div className="form-group">
                                  <Field
                                    name="firstName"
                                    placeholder="First Name*"
                                    className={`form-control styled-input ${
                                      touched.firstName && errors.firstName ? 'is-invalid' : ''
                                    }`}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    name="firstName"
                                    className="invalid-feedback"
                                  />
                                </div>
                              </Col>

                              <Col sm={12} lg={6}>
                                <div className="form-group">
                                  <Field
                                    name="lastName"
                                    placeholder="Last Name*"
                                    className={`form-control styled-input ${
                                      touched.lastName && errors.lastName ? 'is-invalid' : ''
                                    }`}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    name="lastName"
                                    className="invalid-feedback"
                                  />
                                </div>
                              </Col>

                              <Col sm={12} lg={6}>
                                <div className="form-group">
                                  <Field
                                    name="email"
                                    placeholder="E-mail Address*"
                                    className={`form-control styled-input ${
                                      touched.email && errors.email ? 'is-invalid' : ''
                                    }`}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    name="email"
                                    className="invalid-feedback"
                                  />
                                </div>
                              </Col>

                              <Col sm={12} lg={6}>
                                <div className="form-group">
                                  <Field
                                    name="companyName"
                                    placeholder="Company Name"
                                    className="form-control styled-input"
                                  />
                                </div>
                              </Col>


                              <Col sm={12} lg={3}>
                                <div className="form-group">
                                  <Field
                                    type="number"
                                    name="streetNumber"
                                    placeholder="Street Number*"
                                    className="form-control styled-input"
                                  />
                                </div>
                              </Col>

                              <Col sm={12} lg={7}>
                                <div className="form-group">
                                  <Field
                                    name="streetName"
                                    placeholder="Street Name*"
                                    className={`form-control styled-input ${
                                      touched.streetName && errors.streetName ? 'is-invalid' : ''
                                    }`}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    name="streetName"
                                    className="invalid-feedback"
                                  />
                                </div>
                              </Col>

                              <Col sm={12} lg={2}>
                                <div className="form-group">
                                  <Field
                                    type="number"
                                    name="unitNumber"
                                    placeholder="Unit/APT"
                                    className="form-control styled-input"
                                  />
                                </div>
                              </Col>

                              <Col sm={12} lg={4}>
                                <div className="form-group">
                                  <Field
                                    name="city"
                                    placeholder="City*"
                                    className={`form-control styled-input ${
                                      touched.city && errors.city ? 'is-invalid' : ''
                                    }`}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    name="city"
                                    className="invalid-feedback"
                                  />
                                </div>
                              </Col>

                              <Col sm={12} lg={4}>
                                <div className="form-group">
                                  <Field
                                    name="province"
                                    placeholder="Province*"
                                    className={`form-control styled-input ${
                                      touched.province && errors.province ? 'is-invalid' : ''
                                    }`}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    name="province"
                                    className="invalid-feedback"
                                  />
                                </div>
                              </Col>

                              <Col sm={12} lg={4}>
                                <div className="form-group">
                                  <Field
                                    name="country"
                                    placeholder="Country*"
                                    className={`form-control styled-input ${
                                      touched.country && errors.country ? 'is-invalid' : ''
                                    }`}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    name="country"
                                    className="invalid-feedback"
                                  />
                                </div>
                              </Col>

                              <Col sm={12} lg={6}>
                                <div className="form-group">
                                  <Field
                                    name="postalCode"
                                    placeholder="Postal Code*"
                                    className={`form-control styled-input ${
                                      touched.postalCode && errors.postalCode ? 'is-invalid' : ''
                                    }`}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    name="postalCode"
                                    className="invalid-feedback"
                                  />
                                </div>
                              </Col>

                              <Col sm={12} lg={6}>
                                <div className="form-group">
                                  <Field
                                    name="phoneNumber"
                                    placeholder="Phone Number*"
                                    className={`form-control styled-input ${
                                      touched.phoneNumber && errors.phoneNumber ? 'is-invalid' : ''
                                    }`}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    name="phoneNumber"
                                    className="invalid-feedback"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                      <Accordion defaultActiveKey="0" className="mt-3">
                        <Card className="shipping-options">
                          <Accordion.Toggle as={Card.Header} eventKey="0">
                        Shipping Options
                            <FontAwesomeIcon icon={faCaretDown} className="float-right" />
                          </Accordion.Toggle>
                          <AccordionCollapse eventKey="0">
                            <Card className="mt-4">
                              <Card.Body>
                                <Row>
                                  <Col onClick={() => this.handleShippingChange('Ground Shipping')} className={`shipping-type ${shippingType === 'Ground Shipping' ? 'shipping-selected' : ''} `} md={4} sm={12}>
                                    <FontAwesomeIcon icon={faTruck} />
                                    <h5>Deliver To Your Home</h5>
                                    <p>Free ground shipping</p>
                                  </Col>
                                  <Col onClick={() => this.handleShippingChange('Pick-Up')} className={`shipping-type ${shippingType === 'Pick-Up' ? 'shipping-selected' : ''} `} md={4} sm={12}>
                                    <FontAwesomeIcon icon={faWalking} />
                                    <h5>Walk In</h5>
                                    <p>Come to one of our locations and pickup your order</p>
                                  </Col>
                                  <Col onClick={() => this.handleShippingChange('Drone Shipping')} className={`shipping-type ${shippingType === 'Drone Shipping' ? 'shipping-selected' : ''} `} md={4} sm={12}>
                                    <FontAwesomeIcon icon={faRobot} />
                                    <h5>Delivery By Drone</h5>
                                    <p>Free delivery by Drone</p>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </AccordionCollapse>
                        </Card>
                      </Accordion>
                    </Col>
                    <Col lg={4}>
                      <OrderSummary data={data} />
                    </Col>
                  </Form>
                )}
              </Formik>
            </Row>
          </>
        ) : <Spinner animation="border" variant="warning" />}
        <Modal
          className="loading-modal"
          show={payalLoading}
          animation={false}
          onHide={() => ''}
        >
          <Modal.Header><Spinner animation="border" className="loading-spinner" variant="warning" /></Modal.Header>
        </Modal>
      </>

    );
  }
}

export default Checkout;

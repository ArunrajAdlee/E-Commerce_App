import * as React from 'react';
import {
  Row,
  Col,
  Button,
  Card,
  Container,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import {
  Formik, Field, Form, ErrorMessage, FormikValues,
} from 'formik';
import * as Yup from 'yup';
import { server, api } from '../../server';

export interface EditDisplayProps {
  handleShowEdit: (isEdit: boolean) => void;
  username: string;
  first_name: string;
  last_name: string;
  brand_name: string;
  phone_number: string;
  email: string;
  street_name: string;
  street_number: number;
  unit_number: number;
  city: string;
  province: string;
  postal_code: string;
  country: string;
}

// YUP form validation
const editFormSchema = Yup.object().shape({
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
  brandName: Yup.string()
    .required('Brand Name is required')
    .max(64, 'Maximum 64 characters'),
  streetNumber: Yup.number().required('Street Number is required'),
  postalCode: Yup.string()
    .required('Postal Code is required')
    .max(64, 'Maximum 64 characters'),
  province: Yup.string()
    .required('Province is required')
    .max(64, 'Maximum 64 characters'),
  phoneNumber: Yup.string()
    .required('Phone Number is required')
    .max(64, 'Maximum characters reached'),
  country: Yup.string()
    .required('Country is required')
    .max(64, 'Maximum 64 characters'),
  unitNumber: Yup.number(),
  city: Yup.string()
    .required('City Name is required')
    .max(32, 'Character limit reached'),
});

class EditUserForm extends React.Component<EditDisplayProps, {}> {
  // Handle the form submit here
  private handleSubmit = async (values: FormikValues, actions: any) => {
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('brand_name', values.brandName);
    formData.append('first_name', values.firstName);
    formData.append('last_name', values.lastName);
    formData.append('street_number', values.streetNumber);
    formData.append('street_name', values.streetName);
    formData.append('unit_number', values.unitNumber);
    formData.append('city', values.city);
    formData.append('province', values.province);
    formData.append('country', values.country);
    formData.append('postal_code', values.postalCode);
    formData.append('phone_number', values.phoneNumber);

    const resp = await server.post(api.user_profile, formData);
    window.location.reload();
  };

  // render method
  render() {
    const {
      handleShowEdit, email, first_name, last_name, brand_name, street_number, street_name, unit_number, city, province, country, postal_code, phone_number,
    } = this.props;
    return (
      <Card>
        <Card.Header className="text-light">Form Edit</Card.Header>
        <Card.Body>
          <Container fluid>
            <Formik
              // Initial values for the form
              initialValues={{
                email,
                firstName: first_name,
                lastName: last_name,
                brandName: brand_name,
                streetNumber: street_number,
                streetName: street_name,
                unitNumber: unit_number,
                city,
                province,
                country,
                postalCode: postal_code,
                phoneNumber: phone_number,
              }}
              validationSchema={editFormSchema}
              // onSubmit
              onSubmit={(values: FormikValues, actions: any) => {
                actions.setSubmitting(true);
                this.handleSubmit(values, actions);
              }}
            >
              {({
                touched, errors, values, isSubmitting,
              }) => (
                <Form>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <Row>
                        <Col>
                          <div className="form-group">
                            <p>Brand Name</p>
                            <Field
                              name="brandName"
                              placeholder="Brand Name"
                              className={`form-control ${
                                touched.brandName && errors.brandName
                                  ? 'is-invalid'
                                  : ''
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="brandName"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="form-group">
                            <p>First Name</p>
                            <Field
                              name="firstName"
                              placeholder="First Name"
                              className={`form-control ${
                                touched.firstName && errors.firstName
                                  ? 'is-invalid'
                                  : ''
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="firstName"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>

                        <Col>
                          <div className="form-group">
                            <p>Last Name</p>
                            <Field
                              name="lastName"
                              placeholder="lastName"
                              className={`form-control ${
                                touched.lastName && errors.lastName
                                  ? 'is-invalid'
                                  : ''
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="lastName"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row>
                        <Col>
                          <div className="form-group">
                            <p>Email</p>
                            <Field
                              name="email"
                              placeholder="email"
                              className={`form-control ${
                                touched.email && errors.email
                                  ? 'is-invalid'
                                  : ''
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="email"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>

                        <Col>
                          <div className="form-group">
                            <p>Phone Number</p>
                            <Field
                              name="phoneNumber"
                              placeholder="Phone Number"
                              className={`form-control ${
                                touched.phoneNumber && errors.phoneNumber
                                  ? 'is-invalid'
                                  : ''
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
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row>
                        <Col>
                          <div className="form-group">
                            <p>Street Number</p>
                            <Field
                              name="streetNumber"
                              placeholder="Street Number"
                              className={`form-control ${
                                touched.streetNumber && errors.streetNumber
                                  ? 'is-invalid'
                                  : ''
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="streetNumber"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>

                        <Col>
                          <div className="form-group">
                            <p>Street Name</p>
                            <Field
                              name="streetName"
                              placeholder="Street Name"
                              className={`form-control ${
                                touched.streetName && errors.streetName
                                  ? 'is-invalid'
                                  : ''
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="streetName"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>
                        <Col>
                          <div className="form-group">
                            <p>Unit Number</p>
                            <Field
                              name="unitNumber"
                              placeholder="Unit Number"
                              className={`form-control ${
                                touched.unitNumber && errors.unitNumber
                                  ? 'is-invalid'
                                  : ''
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="unitNumber"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row>
                        <Col>
                          <div className="form-group">
                            <p>City</p>
                            <Field
                              name="city"
                              placeholder="City"
                              className={`form-control ${
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

                        <Col>
                          <div className="form-group">
                            <p>Province</p>
                            <Field
                              name="province"
                              placeholder="Province"
                              className={`form-control ${
                                touched.province && errors.province
                                  ? 'is-invalid'
                                  : ''
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="province"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>
                        <Col>
                          <div className="form-group">
                            <p>Postal Code</p>
                            <Field
                              name="postalCode"
                              placeholder="Postal Code"
                              className={`form-control ${
                                touched.postalCode && errors.postalCode
                                  ? 'is-invalid'
                                  : ''
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="postalCode"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>

                        <Col>
                          <div className="form-group">
                            <p>Country</p>
                            <Field
                              name="country"
                              placeholder="Country"
                              className={`form-control ${
                                touched.country && errors.country
                                  ? 'is-invalid'
                                  : ''
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="country"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  </ListGroup>
                  <Row>
                    <Col className="mt-2">
                      <Button
                        type="submit"
                        className="btn styled-button post mr-2"
                        disabled={isSubmitting}
                        variant="warning"
                      >
                        {isSubmitting ? 'Please wait...' : 'Submit'}
                      </Button>
                      <Button
                        onClick={() => handleShowEdit(false)}
                        className="btn btn-danger"
                      >
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Container>
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    );
  }
}

export default EditUserForm;

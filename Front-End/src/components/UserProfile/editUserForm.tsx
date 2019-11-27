import * as React from "react";
import { Component } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Card,
  Container,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import { Field, ErrorMessage, Formik, FormikValues } from "formik";
import * as Yup from "yup";

interface UserDisplayProps {
  handleNav: (id: number) => void;
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
export interface EditUserFormState {}

//YUP form validation
const editFormSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required("Password is required")
    .max(32, "Maximum 32 characters"),
  firstName: Yup.string()
    .required("First Name is required")
    .max(32, "Maximum 32 characters"),
  lastName: Yup.string()
    .required("Last Name is required")
    .max(32, "Maximum 32 characters"),
  streetName: Yup.string()
    .required("Street Name is required")
    .max(64, "Maximum 64 characters"),
  streetNumber: Yup.number().required("Street Number is required"),
  postalCode: Yup.string()
    .required("Postal Code is required")
    .max(64, "Maximum 64 characters"),
  province: Yup.string()
    .required("Province is required")
    .max(64, "Maximum 64 characters"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .max(64, "Maximum characters reached"),
  country: Yup.string()
    .required("Country is required")
    .max(64, "Maximum 64 characters"),
  unitNumber: Yup.number(),
  city: Yup.string()
    .required("City Name is required")
    .max(32, "Character limit reached")
});

class EditUserForm extends React.Component<UserDisplayProps, {}> {
  //Handle the form submit here
  handleSubmit(values: FormikValues, actions: any) {
    console.log("submitted");
  }

  //render method
  render() {
    return (
      <Card>
        <Card.Header className="bg-info text-light">Form Edit</Card.Header>
        <Card.Body>
          <Container fluid>
            <Formik
              //Initial values for the form
              initialValues={{
                email: this.props.email,
                firstName: this.props.first_name,
                lastName: this.props.last_name,
                brandName: "",
                streetNumber: this.props.street_number,
                streetName: this.props.street_name,
                unitNumber: this.props.unit_number,
                city: this.props.city,
                province: this.props.province,
                country: this.props.country,
                postalCode: this.props.postal_code,
                phoneNumber: this.props.phone_number
              }}
              validationSchema={editFormSchema}
              //onSubmit
              onSubmit={(values: FormikValues, actions: any) => {
                actions.setSubmitting(true);
                this.handleSubmit(values, actions);
              }}
            >
              {({ touched, errors, values }) => (
                <Form>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <Row>
                        <Col>
                          <div className="form-group">
                            <p>First Name</p>
                            <Field
                              name="firstName"
                              placeholder="First Name"
                              className={`form-control ${
                                touched.firstName && errors.firstName
                                  ? "is-invalid"
                                  : ""
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
                          <Form.Group controlId="editLastName">
                            <div className="form-group">
                              <p>Last Name</p>
                              <Field
                                name="lastName"
                                placeholder="lastName"
                                className={`form-control ${
                                  touched.lastName && errors.lastName
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <ErrorMessage
                                component="div"
                                name="lastName"
                                className="invalid-feedback"
                              />
                            </div>
                          </Form.Group>
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
                                  ? "is-invalid"
                                  : ""
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
                                  ? "is-invalid"
                                  : ""
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
                                  ? "is-invalid"
                                  : ""
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
                                  ? "is-invalid"
                                  : ""
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
                                  ? "is-invalid"
                                  : ""
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
                                touched.city && errors.city ? "is-invalid" : ""
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
                                  ? "is-invalid"
                                  : ""
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
                            <p>Phone Number</p>
                            <Field
                              name="postalCode"
                              placeholder="Postal Code"
                              className={`form-control ${
                                touched.postalCode && errors.postalCode
                                  ? "is-invalid"
                                  : ""
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
                                  ? "is-invalid"
                                  : ""
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
                      <Button className="btn btn-primary mr-1" type="submit">
                        Submit
                      </Button>
                      <Button
                        onClick={() => this.props.handleNav(1)}
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
        <Card.Footer className="bg-info"></Card.Footer>
      </Card>
    );
  }
}

export default EditUserForm;

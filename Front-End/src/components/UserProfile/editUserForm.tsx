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
    .max(64, "Maximum 64 characters")
});

class EditUserForm extends React.Component<UserDisplayProps, {}> {
  handleSubmit(values: FormikValues, actions: any) {
    console.log("submitted");
  }
  render() {
    return (
      <Card>
        <Card.Header className="bg-info text-light">Form Edit</Card.Header>
        <Card.Body>
          <Container fluid>
            <Formik
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
                              placeholder="Username"
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
                          <Form.Group controlId="editPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Phone Number"
                              defaultValue={values.phoneNumber}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row>
                        <Col>
                          <Form.Group controlId="editStreetNum">
                            <Form.Label>Street Number</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Street Number"
                              defaultValue={values.streetNumber}
                            />
                          </Form.Group>
                        </Col>

                        <Col>
                          <Form.Group controlId="editStreetName">
                            <Form.Label>Street Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Street Name"
                              defaultValue={values.streetName}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="editUnit">
                            <Form.Label>Unit Number</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Unit Number"
                              defaultValue={values.unitNumber}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row>
                        <Col>
                          <Form.Group controlId="editCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="City"
                              defaultValue={values.city}
                            />
                          </Form.Group>
                        </Col>

                        <Col>
                          <Form.Group controlId="editProvince">
                            <Form.Label>Province</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Province"
                              defaultValue={values.province}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="editPostalCode">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Postal Code"
                              defaultValue={values.postalCode}
                            />
                          </Form.Group>
                        </Col>

                        <Col>
                          <Form.Group controlId="editCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Country"
                              defaultValue={values.country}
                            />
                          </Form.Group>
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

import React from 'react';
import {
  Row, Col, Button, Alert,
} from 'react-bootstrap';
import {
  Formik, Field, Form, ErrorMessage, FormikValues,
} from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import { server, api } from '../../server';
import { StoreContext } from '../../store';

interface ISignUpValues {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  brandName: string
  streetNumber: number;
  streetName: string;
  unitNumber: number;
  country: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
}

interface IStates {
  isError: boolean;
}

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .max(24, 'Maximum 24 characters'),
  password: Yup.string()
    .min(3, 'Password must be 3 characters at minimum')
    .max(30, 'Password must be 30 characters at maximum')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .required()
    .label('Confirm password')
    .test('passwords-match', 'Passwords do not match',
      function (value: string) {
        return this.parent.password === value;
      }),
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
});

class SignUp extends React.Component<{}, IStates> {
  public readonly state: Readonly<IStates> = {
    isError: false,
  }

  private handleSubmit = async (values: FormikValues, actions: any) => {
    const { login } = this.context;
    try {
      const resp = await server.post(api.auth_create, values);
      if (resp) {
        const userCredentials = { username: values.username, password: values.password };
        await login(userCredentials);
      }
    } catch (e) {
      this.setState({ isError: true });
      actions.setSubmitting(false);
    }
  }

  public render() {
    const { isAuth } = this.context;
    const { isError } = this.state;

    return (
      isAuth ? <Redirect to="/" />
        : (
          <div className="register-container">
            <h1>Create an account</h1>
            { isError
              ? (
                <Alert variant="danger" onClose={() => this.setState({ isError: !isError })} dismissible>
                  <p>Username already exists!</p>
                </Alert>
              ) : ''}
            <Formik
              initialValues={{
                username: '', email: '', password: '', confirmPassword: '', firstName: '', lastName: '', brandName: '', streetNumber: undefined, streetName: '', unitNumber: undefined, city: '', country: '', postalCode: '', phoneNumber: '',
              }}
              validationSchema={SignUpSchema}
              onSubmit={(values: FormikValues, actions: any) => {
                actions.setSubmitting(true);
                this.handleSubmit(values, actions);
              }}
            >
              {({ touched, errors, isSubmitting }) => (
                <Form className="mt-4">
                  <Row>
                    <Col sm={12} lg={6}>
                      <div className="form-group">
                        <Field
                          name="username"
                          placeholder="Username"
                          className={`form-control styled-input ${
                            touched.username && errors.username ? 'is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="username"
                          className="invalid-feedback"
                        />
                      </div>
                    </Col>
                    <Col sm={12} lg={6}>
                      <div className="form-group">
                        <Field
                          name="email"
                          placeholder="Email Address"
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
                          name="password"
                          type="password"
                          placeholder="Password"
                          className={`form-control styled-input ${
                            touched.password && errors.password ? 'is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="password"
                          className="invalid-feedback"
                        />
                      </div>
                    </Col>

                    <Col sm={12} lg={6}>
                      <div className="form-group">
                        <Field
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm Password"
                          className={`form-control styled-input ${
                            touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="confirmPassword"
                          className="invalid-feedback"
                        />
                      </div>
                    </Col>

                    <Col sm={12} lg={6}>
                      <div className="form-group">
                        <Field
                          name="firstName"
                          placeholder="First Name"
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
                          placeholder="Last Name"
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


                    <Col sm={12} lg={3}>
                      <div className="form-group">
                        <Field
                          type="number"
                          name="streetNumber"
                          placeholder="Street Number"
                          className="form-control styled-input"
                        />
                      </div>
                    </Col>

                    <Col sm={12} lg={7}>
                      <div className="form-group">
                        <Field
                          name="streetName"
                          placeholder="Street Name"
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

                    <Col sm={12} lg={6}>
                      <div className="form-group">
                        <Field
                          name="city"
                          placeholder="City"
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

                    <Col sm={12} lg={6}>
                      <div className="form-group">
                        <Field
                          name="country"
                          placeholder="Country"
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
                          placeholder="Postal Code"
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
                          placeholder="Phone Number"
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

                    <Col sm={12} lg={6}>
                      <div className="form-group">
                        <Field
                          name="brandName"
                          placeholder="Brand Name"
                          className="form-control styled-input"
                        />
                      </div>
                    </Col>

                    <Button
                      type="submit"
                      className="btn-block styled-button mt-4"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Please wait...' : 'Sign Up'}
                    </Button>
                  </Row>
                </Form>
              )}
            </Formik>
          </div>
        )
    );
  }
}

SignUp.contextType = StoreContext;
export default SignUp;

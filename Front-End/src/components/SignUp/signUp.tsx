import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import {
  Formik, Field, Form, ErrorMessage, FormikValues,
} from 'formik';
import * as Yup from 'yup';
import axios from '../../server';

interface SignUpValues {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  address: string;
  country: string;
  city: string;
  postalCode: string;
  phoneNumber: string;

}

interface IStates {
  isUsernameTaken: boolean;
}

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
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
    .required('Password is required'),
  address: Yup.string()
    .required('Address is required'),
  city: Yup.string()
    .required('City is required'),
  country: Yup.string()
    .required('Country is required'),
  postalCode: Yup.string()
    .required('Postal Code is required'),
  phoneNumber: Yup.string()
    .required('Phone Number is required'),
});


class SignUp extends React.Component<{}, IStates> {
  public readonly state: Readonly<IStates> = {
    isUsernameTaken: false,
  }

  public componentDidMount() {
  }

  private handleSubmit = (values: FormikValues) => {
    console.log(values);
  }

  public render() {
    return (
      <div className="register-container">
        <h1>Create an account</h1>
        <Formik
          initialValues={{
            username: '', email: '', password: '', confirmPassword: '', address: '', city: '', country: '', postalCode: '', phoneNumber: '',
          }}
          validationSchema={SignUpSchema}
          onSubmit={(values: FormikValues) => {
            alert('Form is validated! Submitting the form...');
            this.handleSubmit(values);
          }}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form className="mt-5">
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
                      name="address"
                      placeholder="Address"
                      className={`form-control styled-input ${
                        touched.address && errors.address ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="address"
                      className="invalid-feedback"
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
    );
  }
}

export default SignUp;

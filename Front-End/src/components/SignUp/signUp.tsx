import React from 'react';
import {
  Row, Col, Button, Alert,
} from 'react-bootstrap';
import {
  Formik, Field, Form, ErrorMessage, FormikValues,
} from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import axios from '../../server';
import { StoreContext } from '../../store';

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
  isError: boolean;
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
    isError: false,
  }

  public componentDidMount() {
  }

  private handleSubmit = async (values: FormikValues, actions: any) => {
    const { login } = this.context;
    try {
      const resp = await axios.post('/auth/create', values);
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
                username: '', email: '', password: '', confirmPassword: '', address: '', city: '', country: '', postalCode: '', phoneNumber: '',
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
        )
    );
  }
}

SignUp.contextType = StoreContext;
export default SignUp;

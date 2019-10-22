import React from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import {
  Formik, Field, Form, ErrorMessage, FormikValues,
} from 'formik';
import * as Yup from 'yup';
import { Link, Redirect } from 'react-router-dom';
import { StoreContext } from '../../store';


export interface ILoginFields {
  user: string,
  pass: string,
}

interface IStates {
  isError: boolean;
}

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  password: Yup.string()
    .min(3, 'Password must be 3 characters at minimum')
    .required('Password is required'),
});


class Login extends React.Component<{}, IStates> {
  public readonly state: Readonly<IStates> = {
    isError: false,
  }

  public componentDidMount() {
  }

  private handleSubmit = (values: FormikValues) => {
    console.log(values);
    const { login } = this.context;
    login(this, values);
  }

  public render() {
    const { isAuth } = this.context;
    console.log(isAuth);
    return (
      isAuth ? <Redirect to="/" />
        : (
          <Row className="login-register-container">
            <Col className="create-account" md={12} lg={6}>
              <div>
                <h4>New to our website?</h4>
                <p>Sign-up today to gain the ability to sell, buy and share your reviews!</p>
                <Link to="/register">
                  <Button variant="warning" className="styled-button mt-3">CREATE AN ACCOUNT</Button>
                </Link>
              </div>
            </Col>
            <Col className="login-container" md={12} lg={6}>
              <div className="login-content">
                <h5>LOG IN</h5>
                <Formik
                  initialValues={{ username: '', password: '' }}
                  validationSchema={LoginSchema}
                  onSubmit={(values: FormikValues) => {
                    this.handleSubmit(values);
                  }}
                >
                  {({ touched, errors, isSubmitting }) => (
                    <Form>
                      <div>
                        <Field
                          name="username"
                          placeholder="Username"
                          className={`form-control styled-input login-input ${
                            touched.username && errors.username ? 'is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="username"
                          className="invalid-feedback"
                        />
                      </div>

                      <div>
                        <Field
                          type="password"
                          name="password"
                          placeholder="Password"
                          className={`form-control styled-input login-input  
                      ${
                        touched.password && errors.password ? 'is-invalid' : ''
                      }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="password"
                          className="invalid-feedback"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="btn-block styled-button"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Please wait...' : 'Sign in'}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            </Col>
          </Row>
        )
    );
  }
}

Login.contextType = StoreContext;
export default Login;

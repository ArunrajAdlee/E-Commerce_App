import React from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';


interface IStates {
  user: string,
  pass: string,
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
    user: '',
    pass: '',
  }

  public componentDidMount() {
  }

  private handleSubmit = (username: string, password:string) => {
    console.log(username);
    console.log(password);
  }

  public render() {
    return (
      <Row className="login-register-container">
        <Col className="create-account" md={12} lg={6}>
          <div>
            <h4>New to our website?</h4>
            <p>Sign-up today to gain the ability to sell, buy and share your reviews!</p>
            <Button variant="warning" className="styled-button mt-3">CREATE AN ACCOUNT</Button>
          </div>
        </Col>
        <Col className="login-container" md={12} lg={6}>
          <div className="login-content">
            <h5>LOG IN</h5>
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={({ username, password }) => {
                this.handleSubmit(username, password);
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
                      className={`form-control styled-input login-input  ${
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
    );
  }
}

export default Login;

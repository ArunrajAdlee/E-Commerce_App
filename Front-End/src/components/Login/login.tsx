import React from 'react';
import {
  Row, Col, Button, Alert,
} from 'react-bootstrap';
import {
  Formik, Field, Form, ErrorMessage, FormikValues, FormikActions,
} from 'formik';
import * as Yup from 'yup';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import { StoreContext } from '../../store';
import ErrorAlert from '../Misc/errorAlert';


export interface ILoginFields {
  username: string,
  password: string,
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

interface IProps extends RouteComponentProps<any> {}

class Login extends React.Component<IProps, IStates> {
  public readonly state: Readonly<IStates> = {
    isError: false,
  }

  private handleSubmit = async (values: FormikValues, actions: any) => {
    const { login, isAuth } = this.context;
    await login(values);
    if (!isAuth) {
      this.setState({ isError: true });
      actions.setSubmitting(false);
    }
  }

  public render() {
    const { isAuth } = this.context;
    const { isError } = this.state;
    return (
      isAuth ? <Redirect push to="/" />
        : (
          <Row className="login-register-container">
            <Col className="create-account" lg={12} xl={6}>
              <div>
                <h4>New to our website?</h4>
                <p>Sign-up today to gain the ability to sell, buy and share your reviews!</p>
                <Link to="/register">
                  <Button variant="warning" className="styled-button mt-3">CREATE AN ACCOUNT</Button>
                </Link>
              </div>
            </Col>
            <Col className="login-container" lg={12} xl={6}>
              <div className="login-content">
                <h5>LOG IN</h5>
                <ErrorAlert msg="Username or Password is incorrect!" isError={isError} onCloseError={() => this.setState({ isError: !isError })} />
                <Formik
                  initialValues={{ username: '', password: '' }}
                  validationSchema={LoginSchema}
                  onSubmit={(values: FormikValues, actions: any) => {
                    actions.setSubmitting(true);
                    this.handleSubmit(values, actions);
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
                        className="btn-block styled-button sign-in"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'PLEASE WAIT...' : 'LOGIN'}
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

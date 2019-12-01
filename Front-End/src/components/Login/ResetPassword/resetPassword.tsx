/* eslint-disable object-shorthand */
import React from 'react';
import Button from 'react-bootstrap/Button';
import {
  FormControl, InputGroup, Row, Col,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { RouteComponentProps, Redirect } from 'react-router';
import {
  Field, ErrorMessage, Formik, FormikValues, Form,
} from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import ErrorAlert from '../../Misc/errorAlert';
import { server, api } from '../../../server';
import { StoreContext } from '../../../store';


const ResetPasswordSchema = Yup.object().shape({
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
});

interface IStates {
  username: string,
  token: string,
  isSuccess: boolean;
}

interface IProps extends RouteComponentProps<any> {}

class ResetPassword extends React.Component<IProps, IStates> {
    public readonly state: Readonly<IStates> = {
      username: '',
      token: '',
      isSuccess: false,
    }

    public async componentDidMount() {
      const { match, history } = this.props;
      const { token } = match.params;

      try {
        const resp = await server.get(api.auth_checkResetPassword, { params: { resetPasswordToken: token } });
        if (resp.data) {
          this.setState({ username: resp.data.username, token: token });
        }
      } catch (e) {
        history.push('/');
      }
    }

    private async handleSubmit(values: any, actions: any) {
      const { username, token } = this.state;
      try {
        const resp = await server.post(api.auth_resetPassword, { username: username, resetPasswordToken: token, password: values.password });
        if (resp) {
          this.setState({ isSuccess: true });
        }
      } catch (e) {
      }
    }

    public render() {
      const { username, isSuccess } = this.state;
      const { isAuth } = this.context;
      return (
        !isAuth
          ? !isSuccess ? (
            <>
              <p>{`Hi ${username}, enter your new password and submit to reset your password`}</p>
              <Formik
                initialValues={{
                  password: '', confirmPassword: '',
                }}
                validationSchema={ResetPasswordSchema}
                onSubmit={(values: FormikValues, actions: any) => {
                  actions.setSubmitting(true);
                  this.handleSubmit(values, actions);
                }}
              >
                {({ touched, errors, isSubmitting }) => (
                  <Form className="mt-4">
                    <div className="form-group">
                      <Row>
                        <Col md={6}>
                          <Field
                            name="password"
                            type="password"
                            placeholder="New Password"
                            className={`form-control styled-input ${
                              touched.password && errors.password ? 'is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage
                            component="div"
                            name="password"
                            className="invalid-feedback"
                          />
                        </Col>
                        <Col md={6}>
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
                        </Col>
                      </Row>
                    </div>
                    <Button
                      type="submit"
                      className="btn-block styled-button mt-4"
                      disabled={isSubmitting}
                      variant="warning"
                    >
                      {isSubmitting ? 'Please wait...' : 'Update Password'}
                    </Button>
                  </Form>
                )}
              </Formik>
            </>
          )
            : (
              <>
                <h3>Your password has been reset!</h3>
                <Link to="/login">Clik Here to go to Login Page</Link>
              </>
            )
          : <Redirect to="/" push />
      );
    }
}

ResetPassword.contextType = StoreContext;
export default ResetPassword;

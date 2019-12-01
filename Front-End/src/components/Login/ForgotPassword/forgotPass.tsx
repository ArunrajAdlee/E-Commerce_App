import React from 'react';
import Button from 'react-bootstrap/Button';
import {
  FormControl, InputGroup, Row, Col,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { RouteComponentProps } from 'react-router';
import {
  Field, ErrorMessage, Formik, FormikValues, Form,
} from 'formik';
import * as Yup from 'yup';
import ErrorAlert from '../../Misc/errorAlert';
import { server, api } from '../../../server';


const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email(),
});

interface IStates {
  isError: boolean,
  isSuccess: boolean,
}

class ForgotPassword extends React.Component<{}, IStates> {
    public readonly state: Readonly<IStates> = {
      isError: false,
      isSuccess: false,
    }

    private async handleSubmit(values: any, actions: any) {
      try {
        const resp = await server.post(api.auth_forgotPassword, { email: values.email });
        if (resp) {
          this.setState({ isSuccess: true });
          actions.setSubmitting(false);
        }
      } catch (e) {
        this.setState({ isError: true });
        actions.setSubmitting(false);
      }
    }

    public render() {
      const { isError, isSuccess } = this.state;
      return (
        <>
          <p>Enter the email address associated with your account and we'll send you an email to reset your password!</p>
          <ErrorAlert msg="That email address is not associated with any account" isError={isError} onCloseError={() => this.setState({ isError: false })} />
          <ErrorAlert msg="An email was sent to your account. Follow the instructions to reset your password." type="success" isError={isSuccess} onCloseError={() => this.setState({ isSuccess: false })} />
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={(values: FormikValues, actions: any) => {
              actions.setSubmitting(true);
              this.handleSubmit(values, actions);
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form className="mt-4">
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
                <Button
                  type="submit"
                  className="btn-block styled-button mt-4"
                  disabled={isSubmitting || isSuccess}
                  variant="warning"
                >
                  {isSubmitting ? 'Please wait...' : 'Send Recovery Email'}
                </Button>
              </Form>
            )}
          </Formik>
        </>
      );
    }
}

export default ForgotPassword;

import { Alert } from 'react-bootstrap';
import React from 'react';


interface IProps {
    isError: boolean;
    onCloseError: () => void;
    msg: string,
    type?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light';
}

const ErrorAlert = (props: IProps) => {
  const {
    isError, onCloseError, msg, type,
  } = props;
  const variant = type || 'danger';
  return (
    isError
      ? (
        <Alert variant={variant} onClose={() => onCloseError()} dismissible>
          <p>{msg}</p>
        </Alert>
      ) : <></>
  );
};

export default ErrorAlert;

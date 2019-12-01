import { Alert } from 'react-bootstrap';
import React from 'react';


interface IProps {
    isError: boolean;
    onCloseError: () => void;
    msg: string,
}

const ErrorAlert = (props: IProps) => {
  const { isError, onCloseError, msg } = props;

  return (
    isError
      ? (
        <Alert variant="danger" onClose={() => onCloseError()} dismissible>
          <p>{msg}</p>
        </Alert>
      ) : <></>
  );
};

export default ErrorAlert;

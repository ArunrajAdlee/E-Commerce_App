/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../store';

interface IStates {}

interface IProps {
  render: any;
  authenticated?: boolean;
}

class CheckAuth extends React.Component<IProps, {}> {
  public async componentDidUpdate() {
    const { logout, isAuth } = this.context;
    const resp = await axios.get('http://localhost:4000/auth/status');
    if (resp) {
      if (!resp.data.isAuthenticated && isAuth) { logout(); }
    }
  }

  public render() {
    const { render } = this.props;
    const { isAuth } = this.context;
    return (render(isAuth));
  }
}


CheckAuth.contextType = StoreContext;
export default CheckAuth;

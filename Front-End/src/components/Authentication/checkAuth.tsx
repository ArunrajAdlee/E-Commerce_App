import React from 'react';
import axios from '../../server';
import { StoreContext } from '../../store';

interface IStates {}

interface IProps {
  render: any;
  authenticated?: boolean;
}

class CheckAuth extends React.Component<IProps, {}> {
  public async componentDidMount() {
    await this.checkUserAuth();
    console.log('running');
  }

  public async componentDidUpdate() {
    await this.checkUserAuth();
    console.log('running');
  }

  public async checkUserAuth() {
    const { logout, isAuth, setAuthState } = this.context;
    const resp = await axios.get('/auth/status');
    if (resp) {
      if (!resp.data.isAuthenticated && isAuth) { logout(); } else if (resp.data.isAuthenticated && !isAuth) { setAuthState(true, ''); }
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

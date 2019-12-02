import React from 'react';
import { server, api } from '../../server';
import { StoreContext } from '../../store';


interface IStates {
  isMounted: boolean;
}

interface IProps {
  render: any;
}

class CheckAuth extends React.Component<IProps, IStates> {
  public readonly state: Readonly<IStates> = {
    isMounted: false,
  }

  public async componentDidMount() {
    await this.checkUserAuth();
    this.setState({
      isMounted: true,
    });
  }

  public async componentDidUpdate() {
    await this.checkUserAuth();
  }

  public async checkUserAuth() {
    const { logout, isAuth, setAuthState } = this.context;
    const resp = await server.get(api.auth_status);
    if (resp) {
      if (!resp.data.isAuthenticated && isAuth) { logout(); } else if (resp.data.isAuthenticated && !isAuth) { setAuthState(true, resp.data.isAdmin, resp.data.user); }
    }
  }

  public render() {
    const { render } = this.props;
    const { isMounted } = this.state;
    const { isAuth, isAdmin } = this.context;
    return (render(isAuth, isAdmin, isMounted));
  }
}

CheckAuth.contextType = StoreContext;
export default CheckAuth;

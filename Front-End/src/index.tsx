import React, { PureComponent, Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch } from 'react-router';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';
import axios from './server';
import Login, { ILoginFields } from './components/Login/login';
import LandingPage from './components/LandingPage/landingPage';
import DefaultLayout from './layouts/DefaultLayout/defualtLayout';
import LandingLayout from './layouts/LandingPageLayout/landingPageLayout';
import SignUp from './components/SignUp/signUp';
import { StoreContext } from './store';
import ScrollToTop from './components/Misc/scrollToTop';
import SecureRoute from './components/Authentication/secureRoute';

const history = createBrowserHistory();

interface IStates {
  currentUser: string;
  isAuth: boolean;
  setAuthState: (isAuth: boolean, user: string) => void;
  login: (userCredentials: ILoginFields) => void;
  logout: () => void;
}

class App extends React.Component<{}, IStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentUser: '',
      isAuth: false,
      setAuthState: this.setAuthState,
      login: this.login,
      logout: this.logout,
    };
  }

  public setAuthState = (isAuth: boolean, user: string) => {
    this.setState({
      isAuth,
      currentUser: user,
    });
  }

  public login = async (userCredentials: ILoginFields) => {
    try {
      const resp = await axios.post('/auth/login', userCredentials);
      if (resp) {
        this.setAuthState(true, userCredentials.username);
      }
    } catch {}
  }

  public logout = async () => {
    try {
      const resp = await axios.post('auth/logout');
      if (resp) {
        this.setAuthState(false, '');
      }
    } catch {}
  };


  render() {
    return (
      <StoreContext.Provider value={this.state}>
        <Router history={history}>
          <ScrollToTop />
          <Switch>
            <SecureRoute path="/listings" pageComponent={LandingPage} layoutComponent={DefaultLayout} pageTitle="Listings" />
            <SecureRoute authenticated path="/cart" pageComponent={LandingPage} layoutComponent={DefaultLayout} pageTitle="Your Shoppping Cart" />
            <SecureRoute path="/login" pageComponent={Login} layoutComponent={DefaultLayout} pageTitle="Login/Register" />
            <SecureRoute path="/register" pageComponent={SignUp} layoutComponent={DefaultLayout} pageTitle="Sign Up" />
            <SecureRoute pageComponent={LandingPage} layoutComponent={LandingLayout} />
          </Switch>
        </Router>
      </StoreContext.Provider>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

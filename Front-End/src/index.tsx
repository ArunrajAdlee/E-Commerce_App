import React, { PureComponent, Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch } from 'react-router';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import Login, { ILoginFields } from './components/Login/login';
import LandingPage from './components/LandingPage/landingPage';
import DefaultLayout from './layouts/DefaultLayout/defualtLayout';
import LandingLayout from './layouts/LandingPageLayout/landingPageLayout';
import SignUp from './components/SignUp/signUp';
import { StoreContext, store } from './store';


const history = createBrowserHistory();

interface IStates {
  userToken: any;
  isAuth: boolean;
  login: (self:any, userCredentials: ILoginFields) => void;
  logout: () => void;
}

class App extends React.Component<{}, IStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      userToken: '',
      isAuth: false,
      login: this.login,
      logout: this.logout,
    };
  }

  public login = (self:any, userCredentials: ILoginFields) => {
    debugger;

    return axios.post('http://localhost:4000/auth/login', userCredentials)
      .then((response) => {
        debugger;
        const { token } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(token.user));
        self.setState({
          isAuth: true,
          userToken: token,
        });
        return response;
      });
  }


  public logout = () => {
    this.setState({ isAuth: false });
  };


  render() {
    return (
      <StoreContext.Provider value={this.state}>
        <Router history={history}>
          <Switch>
            <DefaultLayout path="/listings" component={LandingPage} pageTitle="Listings" />
            <DefaultLayout path="/cart" component={LandingPage} pageTitle="Your Shoppping Cart" authenticated />
            <DefaultLayout path="/login" component={Login} pageTitle="Login/Register" />
            <DefaultLayout path="/register" component={SignUp} pageTitle="Sign Up" />
            <LandingLayout component={LandingPage} />
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

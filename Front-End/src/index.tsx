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
import { StoreContext } from './store';
import ScrollToTop from './components/Misc/scrollToTop';


const history = createBrowserHistory();

interface IStates {
  currentUser: string;
  isAuth: boolean;
  login: (userCredentials: ILoginFields) => void;
  logout: () => void;
}

class App extends React.Component<{}, IStates> {
  constructor(props: any) {
    super(props);
    console.log(sessionStorage);
    this.state = {
      currentUser: '',
      isAuth: false,
      login: this.login,
      logout: this.logout,
    };
  }

  public login = async (userCredentials: ILoginFields) => {
    await axios.post('http://localhost:4000/auth/login', userCredentials, {withCredentials: true})
      .then((response) => {
        this.setState({
          isAuth: true,
          currentUser: userCredentials.username,
        });
        return response;
      })
      .catch((error) => {
      });
  }


  public logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('currentUser');
    delete axios.defaults.headers.common.Authorization;

    this.setState({
      isAuth: false,
    });
  };


  render() {
    return (
      <StoreContext.Provider value={this.state}>
        <Router history={history}>
          <ScrollToTop />
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

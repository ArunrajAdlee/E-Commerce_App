import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch } from 'react-router';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';
import Login from './components/Login/login';
import LandingPage from './components/LandingPage/landingPage';
import DefaultLayout from './layouts/DefaultLayout/defualtLayout';
import LandingLayout from './layouts/LandingPageLayout/landingPageLayout';

const history = createBrowserHistory();


ReactDOM.render(
  <Router history={history}>
    <Switch>
      <DefaultLayout path="/listings" component={LandingPage} pageTitle="Listings" />
      <DefaultLayout path="/cart" component={LandingPage} pageTitle="Your Shoppping Cart" />
      <DefaultLayout path="/login" component={Login} pageTitle="Login/Register" />
      <LandingLayout component={LandingPage} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);

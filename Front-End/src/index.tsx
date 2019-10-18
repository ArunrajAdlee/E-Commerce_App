import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';
import Login from './components/Login';
import Layout from './layouts/Layout';
import LandingPage from './components/LandingPage';

const history = createBrowserHistory();


ReactDOM.render(
  <Router history={history}>
    <Route path="/login">
      <Login />
    </Route>
    <Layout>
      <Switch>
        <Route path="/listings">
          <LandingPage />
        </Route>
        <Route path="/cart">
          <LandingPage />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Layout>
  </Router>,
  document.getElementById('root'),
);

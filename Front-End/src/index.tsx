import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';
import App from './App';
import Login from './components/Login';

const history = createBrowserHistory();


ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  </Router>, document.getElementById('root'),
);

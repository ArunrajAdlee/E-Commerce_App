/* eslint-disable react/no-unused-state */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch } from 'react-router';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';
import { server, api } from './server';
import Login, { ILoginFields } from './components/Login/login';
import LandingPage from './components/LandingPage/landingPage';
import DefaultLayout from './layouts/DefaultLayout/defualtLayout';
import CreateListing from './components/CreateListing';
import LandingLayout from './layouts/LandingPageLayout/landingPageLayout';
import ListingDetails from './components/ListingDetails/ListingDetails';
import SearchPage from './components/Listings/SearchPage/searchPage';
import CategoryPage from './components/Listings/CategoryPage/categoryPage';
import ListingsPage from './components/Listings/ListingsPage/listingsPage';
import SignUp from './components/SignUp/signUp';
import { StoreContext, IUserInfo } from './store';
import ScrollToTop from './components/Misc/scrollToTop';
import SecureRoute from './components/Authentication/secureRoute';
import TextFilter from './components/OrderHistory/orderHistoryBuyer';
import Checkout from './components/Checkout/checkout';
import ResetPassword from './components/Login/ResetPassword/resetPassword';
import UserDisplay from './components/UserProfile/userDisplay';
import UserProfileLayout from './layouts/UserProfileLayout/userProfileLayout';
import OrderDetails from './components/OrderHistory/orderDetails';
import AdminPanelLayout from './layouts/AdminPanelLayout/adminPanelLayout';
import SiteActivty from './components/AdminPanel/SiteActivity/siteActivity';

const history = createBrowserHistory();

interface IStates {
  userInfo: IUserInfo;
  isAuth: boolean;
  isAdmin: boolean;
  setAuthState: (isAuth: boolean, isAdmin: boolean, userInfo: IUserInfo) => void;
  login: (userCredentials: ILoginFields) => void;
  logout: () => void;
}

class App extends React.Component<{}, IStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      userInfo: {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        brand_name: '',
        phone_number: '',
        address: 0,
        street_name: '',
        street_number: 0,
        unit_number: 0,
        city: '',
        province: '',
        postal_code: '',
        country: '',
      },
      isAuth: false,
      isAdmin: false,
      setAuthState: this.setAuthState,
      login: this.login,
      logout: this.logout,
    };
  }

  public setAuthState = (isAuth: boolean, isAdmin: boolean, userInfo: IUserInfo) => {
    this.setState({
      isAuth,
      isAdmin,
      userInfo,
    });
  };

  public login = async (userCredentials: ILoginFields) => {
    const resp = await server.post(api.auth_login, userCredentials);
    if (resp) {
      this.setAuthState(true, resp.data.isAdmin, resp.data.user);
    }
  };

  public logout = async () => {
    try {
      const resp = await server.post(api.auth_logout);
      if (resp) {
        this.setAuthState(false, false, {
          username: '',
          email: '',
          first_name: '',
          last_name: '',
          brand_name: '',
          phone_number: '',
          address: 0,
          street_name: '',
          street_number: 0,
          unit_number: 0,
          city: '',
          province: '',
          postal_code: '',
          country: '',
        });
      }
    } catch {}
  };

  render() {
    return (
      <StoreContext.Provider value={this.state}>
        <Router history={history}>
          <ScrollToTop />
          <Switch>
            <SecureRoute authenticated path="/profile" pageComponent={UserDisplay} layoutComponent={UserProfileLayout} pageTitle="User Profile" />
            <SecureRoute authenticated path="/checkout" pageComponent={Checkout} layoutComponent={DefaultLayout} pageTitle="Checkout" />
            <SecureRoute admin path="/admin/activity" pageComponent={SiteActivty} layoutComponent={AdminPanelLayout} pageTitle="Site Activity" />
            <SecureRoute noAuth path="/auth/reset/:token" pageComponent={ResetPassword} layoutComponent={DefaultLayout} pageTitle="Reset Password" />
            <SecureRoute path="/cart" pageComponent={LandingPage} layoutComponent={DefaultLayout} pageTitle="Your Shoppping Cart" />
            <SecureRoute noAuth path="/login" pageComponent={Login} layoutComponent={DefaultLayout} pageTitle="Login/Register" />
            <SecureRoute path="/listings/category/:categoryId/:categoryName" pageComponent={CategoryPage} layoutComponent={DefaultLayout} pageTitle="Category Listings" />
            <SecureRoute path="/listings/search/:searchQuery" pageComponent={SearchPage} layoutComponent={DefaultLayout} pageTitle="Search Listings" />
            <SecureRoute path="/listings/:id" pageComponent={ListingDetails} layoutComponent={DefaultLayout} pageTitle="Listing Details" />
            <SecureRoute path="/listings" pageComponent={ListingsPage} layoutComponent={DefaultLayout} pageTitle="Listings" />
            <SecureRoute noAuth path="/register" pageComponent={SignUp} layoutComponent={DefaultLayout} pageTitle="Sign Up" />
            <SecureRoute authenticated path="/createListing" pageComponent={CreateListing} layoutComponent={DefaultLayout} pageTitle="Create Listing" />
            <SecureRoute path="/orderhistory" pageComponent={TextFilter} layoutComponent={DefaultLayout} pageTitle="Order History" />
            <SecureRoute path="/orderdetails" pageComponent={OrderDetails} layoutComponent={DefaultLayout} pageTitle="Order Details" />
            <SecureRoute pageComponent={LandingPage} layoutComponent={LandingLayout} />
            
          </Switch>
        </Router>
      </StoreContext.Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

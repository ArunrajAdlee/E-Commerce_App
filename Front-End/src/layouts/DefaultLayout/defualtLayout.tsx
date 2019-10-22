/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import { StoreContext } from '../../store';
import Login from '../../components/Login/login';


interface IDefaultProps {
  component: any
  path?: string;
  exact?: boolean;
  pageTitle?: string;
  authenticated?: boolean;
}

const DefaultLayout: React.SFC<IDefaultProps> = (props) => {
  const {
    pageTitle, authenticated, component: Component, ...rest
  } = props;
  return (
    <StoreContext.Consumer>
      {(context) => context && (
        ((authenticated && context.isAuth) || !authenticated)
          ? (
            <Route
              {...rest}
              render={(matchProps) => (
                <>
                  <Header pageTitle={pageTitle} />
                  <div className="default-layout-content-container">
                    <Component {...matchProps} />
                  </div>
                  <Footer />
                </>
              )}
            />
          )
          : <Redirect to="/login" push />
      )}
    </StoreContext.Consumer>
  );
};

export default DefaultLayout;

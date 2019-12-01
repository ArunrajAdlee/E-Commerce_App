/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { StickyContainer } from 'react-sticky';
import CheckAuth from './checkAuth';


interface IProps {
  pageComponent: any;
  layoutComponent: any;
  path?: string;
  exact?: boolean;
  pageTitle?: string;
  authenticated?: boolean;
}

const SecureRoute: React.SFC<IProps> = (props) => {
  const {
    pageTitle, authenticated, pageComponent: PageComponent, layoutComponent: LayoutComponent, ...rest
  } = props;
  return (
    <CheckAuth
      render={(isAuth: boolean, isMounted: boolean) => (
        isMounted
          ? (isAuth && authenticated) || !authenticated
            ? (
              <Route
                {...rest}
                render={(matchProps) => (
                  <StickyContainer>
                    <LayoutComponent matchProps={matchProps} pageComponent={PageComponent} pageTitle={pageTitle} />
                  </StickyContainer>
                )}
              />
            )
            : <Redirect exact push to="/login" />
          : <Spinner className="loading-spinner" animation="border" variant="warning" />
      )}
    />
  );
};


export default SecureRoute;

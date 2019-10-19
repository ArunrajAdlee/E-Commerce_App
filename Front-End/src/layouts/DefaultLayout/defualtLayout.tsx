/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Route } from 'react-router-dom';
import Footer from '../Footer/footer';
import Header from '../Header/header';

interface IDefaultProps {
  component: any
  path?: string;
  exact?: boolean;
  pageTitle?: string;
}

const DefaultLayout: React.SFC<IDefaultProps> = (props) => {
  const { pageTitle, component: Component, ...rest } = props;
  return (
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
  );
};

export default DefaultLayout;

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Route } from 'react-router-dom';
import Footer from '../Footer/footer';
import NavigationBar from '../Header/NavigationBar/navigationBar';

interface IDefaultProps {
  component: any
  path?: string;
  exact?: boolean;
}

const LandingLayout: React.SFC<IDefaultProps> = (props) => {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <>
          <NavigationBar />
          <Component {...matchProps} />
          <Footer />
        </>
      )}
    />
  );
};

export default LandingLayout;

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import Footer from '../Footer/footer';
import NavigationBar from '../Header/NavigationBar/navigationBar';

interface IProps {
  pageComponent: any;
  matchProps: any;
}

const LandingLayout: React.SFC<IProps> = (props) => {
  const { pageComponent: Component, matchProps } = props;
  return (
    <>
      <NavigationBar />
      <Component {...matchProps} />
      <Footer />
    </>
  );
};

export default LandingLayout;

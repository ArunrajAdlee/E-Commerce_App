/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import Footer from '../Footer/footer';
import Header from '../Header/header';

interface IProps {
  pageTitle: string;
  component: any
  pageComponent: any;
  matchProps: any;
}

const DefaultLayout: React.SFC<IProps> = (props) => {
  const {
    pageTitle, pageComponent: Component, matchProps,
  } = props;
  return (
    <>
      <Header pageTitle={pageTitle} />
      <div className="default-layout-content-container">
        <Component {...matchProps} />
      </div>
      <Footer />
    </>
  );
};


export default DefaultLayout;

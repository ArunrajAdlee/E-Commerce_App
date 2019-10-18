import React from 'react';
import Footer from '../Footer';
import Header from '../Header';

interface IProps {
  children: any;
}

const Layout = (props: IProps) => {
  const { children } = props;
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

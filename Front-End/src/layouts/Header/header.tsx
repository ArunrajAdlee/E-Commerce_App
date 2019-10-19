import React from 'react';
import NavigationBar from './NavigationBar/navigationBar';

interface IProps {
  pageTitle?: string
}

const Header = (props : IProps) => {
  const { pageTitle } = props;
  return (
    <>
      <NavigationBar />
      <div className="common-header">
        {pageTitle}
      </div>
    </>
  );
};


export default Header;

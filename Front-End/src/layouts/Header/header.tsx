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
        <h1 className="page-title">{pageTitle}</h1>
      </div>

    </>
  );
};


export default Header;

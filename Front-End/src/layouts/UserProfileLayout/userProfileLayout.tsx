/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import UserProfileSideNav from '../../components/UserProfile/sideNav';
import Advert from '../../components/Advertisement/advertisement';

interface IProps {
  pageTitle: string;
  component: any
  pageComponent: any;
  matchProps: any;
}

const UserProfileLayout: React.SFC<IProps> = (props) => {
  const {
    pageTitle, pageComponent: Component, matchProps,
  } = props;
  return (
    <>
      <Header pageTitle={pageTitle} />
      <div className="default-layout-content-container">
        <Advert {...matchProps} />
        <Row>
          <Col lg={4} xl={3}>
            <UserProfileSideNav />
          </Col>
          <Col lg={8} xl={9}>
            <Component {...matchProps} />
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};


export default UserProfileLayout;

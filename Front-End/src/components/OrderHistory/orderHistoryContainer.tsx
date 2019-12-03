import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Row } from 'react-bootstrap';
import BuyerOrderHistory from './buyerOrderTable';
import SellerOrderHistory from './sellerOrderTable';

const OrderHistoryContainer = () => (
  <Tabs className="orderhistory" defaultActiveKey="buyer" id="uncontrolled-tab-example">
    <Tab eventKey="buyer" title="Bought Items">
      <div><BuyerOrderHistory /></div>
    </Tab>
    <Tab eventKey="seller" title="Sold Items">
      <div><SellerOrderHistory /></div>
    </Tab>
  </Tabs>
);

export default OrderHistoryContainer;

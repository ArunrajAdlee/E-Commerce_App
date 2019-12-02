import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { server, api } from '../../server';

interface ISellerList {
  id: number,
  listing_fee: Date,
  listing_id: number,
  order_id: number,
  price_after_tax: string,
  price_before_tax: string,
  purchase_date: Date,
  seller_id: number,
  tax: number;
}

interface IStates{
  sellerData: ISellerList[],
}

// Seller history component
class SellerOrderHistory extends React.Component {
  public readonly state: Readonly<IStates> = {
    sellerData: [],
  };

  public async componentDidMount() {
    const resp = await server.get(api.order_history_seller);
    if (resp.data) {
      this.setState({
        sellerData: resp.data.order,
      });
    }
  }

  private ListingLink = (cell: any, row: any) => (
    <Link to={`/listings/${row.listing_id}`}>
      Sold Listing
      {' '}
      <FontAwesomeIcon icon={faArrowAltCircleRight} />
    </Link>
  )

  render() {
    const { sellerData } = this.state;
    return (
      <div>
        <BootstrapTable pagination data={sellerData} trClassName="bootstrap_table">
          <TableHeaderColumn dataSort dataField="order_id" isKey filter={{ type: 'TextFilter', delay: 200 }}>Order ID</TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="purchase_date" dataFormat={(cell, row) => moment(cell).format('YYYY-MM-DD')}>Purchase Date</TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="quantity" filter={{ type: 'TextFilter', delay: 200 }}>Quantity</TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="tax" dataFormat={(cell, row) => `$${cell}`} filter={{ type: 'TextFilter', delay: 200 }}>Tax</TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="price_after_tax" dataFormat={(cell, row) => `$${cell}`} filter={{ type: 'TextFilter', delay: 200 }}>Total</TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="" dataFormat={this.ListingLink}>Listing</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default SellerOrderHistory;

import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { server, api } from '../../server';


interface ISellerList {
  buyer_id: number,
  date: Date,
  id: number,
  shipped_to: number,
  shipping_status: string,
  shipping_type: string,
  total_fee: number,
  total_price: number,
  total_price_before_tax: number;
  total_tax: number;
}

interface IStates{
  buyerData: ISellerList[],
}

// Buyer history component
class BuyerOrderHistory extends React.Component {
  public readonly state: Readonly<IStates> = {
    buyerData: [],
  };

  public async componentDidMount() {
    const resp = await server.get(api.order_history_buyer);
    if (resp.data) {
      this.setState({
        buyerData: resp.data,
      });
    }
  }

  private orderIdButton = (cell: any, row: any) => (
    <Link to={`/profile/orderDetails/${row.id}`}>
      Details
      {' '}
      <FontAwesomeIcon icon={faArrowAltCircleRight} />
    </Link>
  )

  render() {
    const { buyerData } = this.state;
    return (
      <div>
        <BootstrapTable pagination data={buyerData} trClassName="bootstrap_table">
          <TableHeaderColumn dataSort dataField="id" isKey filter={{ type: 'TextFilter', delay: 200 }}>Order ID</TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="date" dataFormat={(cell, row) => moment(cell).format('YYYY-MM-DD')}>Order Date</TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="shipping_status" filter={{ type: 'TextFilter', delay: 200 }}>Shipping Status</TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="shipping_type" filter={{ type: 'TextFilter', delay: 200 }}>Shipping Type</TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="total_price" dataFormat={(cell, row) => `$${cell}`} filter={{ type: 'TextFilter', delay: 200 }}>Total</TableHeaderColumn>
          <TableHeaderColumn dataSort dataField="" dataFormat={this.orderIdButton}>Order Details</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default BuyerOrderHistory;

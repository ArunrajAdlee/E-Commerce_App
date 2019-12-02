import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { ReactComponent } from '*.svg';
import { render } from 'react-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { RouteComponentProps, Link, Redirect } from 'react-router-dom';
import { server, api } from '../../server';
import { Button } from 'react-bootstrap';



interface orderBuyer {
  orderid: number,
  date: Date,
  price: number,
  
}

interface orderSeller {
  orderid: number,
  date: Date,
  price: number,
  profit: number,
  
}

interface IStates{

  objbuyer: orderBuyer[],
  objseller: orderSeller[],
}

//Buyer history component
class BuyerOrderHistory extends React.Component {

  public readonly state: Readonly<IStates> = {
    objbuyer: [],
    objseller: []
  };
  
  public async componentDidMount(){
    const resp = await server.get(api.order_history_buyer);
    const resOrders : orderBuyer = resp.data.map((product: any) => ({

      orderid: product.id,
      date: product.date,
      price: product.total_price,

    }));
    this.setState({
      objbuyer: resOrders
    });
    
  }

  orderIdButton(cell: any, row: any) {
     return <Button onClick={(e:any) => console.log('localhost:3000/orderDetails/',(row.order))}>{row.orderid}</Button>;
  }



  render() {
    let { objbuyer } = this.state;
    
    return (
      
      <div>
      <BootstrapTable data={ objbuyer } trClassName='bootstrap_table'>
       
        <TableHeaderColumn  dataField='orderid' dataFormat={this.orderIdButton}  isKey filter={ { type: 'TextFilter', delay: 1000 }  }>Order Id</TableHeaderColumn>
        <TableHeaderColumn dataField='date' filter={ { type: 'TextFilter', delay: 1000 } }>Date</TableHeaderColumn> 
        <TableHeaderColumn dataField='price' filter={ { type: 'TextFilter', delay: 1000 } }>Product Price</TableHeaderColumn>  
      </BootstrapTable>

      
      </div>

    
      

    );
  } 
};

//Seller history component
class SellerOrderHistory extends React.Component{

  public readonly state: Readonly<IStates> = {
    objbuyer: [],
    objseller: [],
  };

  public async componentDidMount(){
    const resp = await server.get(api.order_history_seller);
    console.log('printing results:')
    //console.log('Resuts',resp);
    const resOrders : any = resp.data.order.map((product: any) => ({
      
      orderid: product.id,
      date: product.purchase_date,
      price: product.price_after_tax,
      profit: 0,

    }));




    console.log(resOrders);

    
  
    this.setState({
      objseller: resOrders
    });
    console.log(resOrders);
    
  }


  render(){
    let { objseller } = this.state;

    return(

      <BootstrapTable data={ objseller } trClassName='bootstrap_table'>
        
      <TableHeaderColumn dataField='orderid' isKey filter={ { type: 'TextFilter', delay: 1000 } }>Order ID</TableHeaderColumn>
      <TableHeaderColumn dataField='date' filter={ { type: 'TextFilter', delay: 1000 } }>Purchase Date</TableHeaderColumn>
      <TableHeaderColumn dataField='price' filter={ { type: 'TextFilter', delay: 1000 } }>Product Price</TableHeaderColumn>
      <TableHeaderColumn dataField='profit' filter={ { type: 'TextFilter', delay: 1000 } }>Profit</TableHeaderColumn> 
       </BootstrapTable>

    );
  }
};

class OrderHistory extends React.Component{


  render(){


   

    return(

          <div>
            <Tabs className="orderhistory" defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="buyer" title="Buyer">
              <div><BuyerOrderHistory></BuyerOrderHistory></div>
            </Tab>
              <Tab eventKey="seller" title="Seller">
                <div><SellerOrderHistory></SellerOrderHistory></div>
            </Tab>  
          </Tabs>
          </div>
          );
        }
      }




export default OrderHistory;





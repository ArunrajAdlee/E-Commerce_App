import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { ReactComponent } from '*.svg';
import { render } from 'react-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { RouteComponentProps, Link } from 'react-router-dom';
import { server, api } from '../../server';


//Test inputs
const products = [{
    id: '342432',
    name: 'arun',
    price: '100', 
},
{
    id: '911',
    name: 'arunnots here',
    price: '1001111',
},
{
    id: '718',
    name: 'newname',
    price: '0',
    date: 'Dec 12, 2019',
    profit: '79',
}];


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
}

//Buyer history component
class BuyerOrderHistory extends React.Component {

  public readonly state: Readonly<IStates> = {
    objbuyer: []
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
    console.log(resOrders);
    
  }

  render() {
    let { objbuyer } = this.state;
    return (
      
      <div>
      <BootstrapTable data={ objbuyer } trClassName='bootstrap_table'>
        <TableHeaderColumn dataField='orderid' isKey filter={ { type: 'TextFilter', delay: 1000 } }>Order Id</TableHeaderColumn>
        <TableHeaderColumn dataField='date'>Date</TableHeaderColumn> 
        <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>  
      </BootstrapTable>

      
      </div>

    
      

    );
  } 
};

//Seller history component
class SellerOrderHistory extends React.Component{


  render(){

    return(

      <BootstrapTable data={ products } trClassName='bootstrap_table'>
        
      <TableHeaderColumn dataField='id' isKey filter={ { type: 'TextFilter', delay: 1000 } }>Order ID</TableHeaderColumn>
      <TableHeaderColumn dataField='name' filter={ { type: 'TextFilter', delay: 1000 } }>Product Name</TableHeaderColumn>
      <TableHeaderColumn dataField='price' filter={ { type: 'TextFilter', delay: 1000 } }>Product Price</TableHeaderColumn>
      <TableHeaderColumn dataField='date' filter={ { type: 'TextFilter', delay: 1000 } }>Product Price</TableHeaderColumn> 
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





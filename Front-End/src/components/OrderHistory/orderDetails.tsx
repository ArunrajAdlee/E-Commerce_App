import * as React from 'react';
import OrderSummary from './../Checkout/orderSummary';
import { server, api } from '../../server';



interface orderinfo {

    orderid: number,
    date: Date,
    price: number,
    payment_method: string,
}

interface address {

    street: string,
    country: string,
    city: string,
    postal_code: string,


}

interface IStates{

    order: orderinfo[],
    useraddress: address[]

}


class OrderDetails extends React.Component{

    public readonly state: Readonly<IStates> = {

        order: [],
        useraddress: [],
    };

    public async componentDidMount(){
        
        //const { match }  = this.props;
        //const { id } = match.params;
        const id = 1;
        const resp = await server.get(`${api.order_history_buyer}${id}`,);
        console.log(resp)
        const ordersum : any = resp.data.cartItems.map((product: any) => ({

            orderid: product.id,
            date: Date.now,
            price: product.total_price,
            payment_method: 'Paypal'

        }));

        //console.log('Results: ', ordersum);

        this.setState({
            order: ordersum

        });
    }

    render(){
        let {order} = this.state;
        return(
           <div className="row"> 
                <div className="col-lg-4">
                    <table>
                        <th>
                            <h5>Order Info</h5>
                        </th>

                        <tr>
                            <td>Order #</td>
                            {/* API DATA <td>{order.orderid}</td> */}
                        </tr>
                        <tr>
                            <td>Date</td>
                            {/* API DATA <td>{order.date}</td> */}
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Payment</td>
                            <td>API CALL</td>
                        </tr>

                    </table>
                
                </div>
    
                <div className="col-lg-4">
                    <table>
                        <th>
                            <h5>Billing Address</h5>
                        </th>

                        <tr>
                            <td>Street</td>
                            <td>API CALL</td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>API CALL</td>
                        </tr>
                        <tr>
                            <td>Country</td>
                            <td>API CALL</td>
                        </tr>
                        <tr>
                            <td>Postal Code</td>
                            <td>API CALL</td>
                        </tr>

                    </table>
                </div>

                <div className="col-lg-4">
                    <table>
                        <th>
                            <h5>Shipping Address</h5>
                        </th>

                        <tr>
                            <td>Street</td>
                            <td>API CALL</td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>API CALL</td>
                        </tr>
                        <tr>
                            <td>Country</td>
                            <td>API CALL</td>
                        </tr>
                        <tr>
                            <td>Postal Cod</td>
                            <td>API CALL</td>
                        </tr>

                    </table>
                </div>

                {/* Need to pass in the data here  */}
                {/* <div> <OrderSummary></OrderSummary> </div> */}
            </div>    
        );
    };
}

export default OrderDetails;
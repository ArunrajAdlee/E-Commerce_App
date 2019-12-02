import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import OrderSummary, { IAddressObj, IOrderData } from '../Checkout/orderSummary';
import { server, api } from '../../server';


interface IOrderInfo {
    address_id: number,
    listings_title: string,
    order_details_listing_fee: number,
    order_details_listing_id: number,
    order_details_order_id: number,
    order_details_price_after_tax: number,
    order_details_price_before_tax: number,
    order_details_purchase_date: Date,
    order_details_quantity: number,
    order_details_seller_id: number,
}

interface IStates{
    order: IOrderInfo[],
    address: IAddressObj;
}

interface IProps extends RouteComponentProps<any> {}


class OrderDetails extends React.Component<IProps, IStates> {
    public readonly state: Readonly<IStates> = {
      order: [],
      address: {} as IAddressObj,
    };

    public async componentDidMount() {
      const { match } = this.props;
      const { id } = match.params;
      const resp = await server.get(`${api.order_details}${id}`);
      if (resp.data) {
        this.setState({
          order: resp.data.orderDetails, address: resp.data.address,
        });
      }
    }

    render() {
      const { order, address } = this.state;
      return (
        order.length > 0 ? (
          <>
            <Row>
              <Col lg={6}>
                <h5>Order Info</h5>
                <hr />
                <Row>
                  <Col lg={6}>
              Order Number
                  </Col>
                  <Col lg={6}>
                    {order[0].order_details_order_id}
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
              Date
                  </Col>
                  <Col lg={6}>
                    {moment(order[0].order_details_purchase_date).format('YYYY-MM-DD')}
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
              Total
                  </Col>
                  <Col lg={6}>
                    {`$${order[0].order_details_price_after_tax}`}
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
              Payment Method
                  </Col>
                  <Col lg={6}>
              Paypal
                  </Col>
                </Row>
              </Col>
              <Col lg={6}>
                <h5>Billing/Shipping Details</h5>
                <hr />
                <Row>
                  <Col lg={6}>
              Address
                  </Col>
                  <Col lg={6}>
                    {`${address.street_number} ${address.street_name}`}
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
              City
                  </Col>
                  <Col lg={6}>
                    {address.city}
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    {address.country}
                  </Col>
                  <Col lg={6}>
                    {address.postal_code}
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
              Postal Code
                  </Col>
                  <Col lg={6}>
              Paypal
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="order-summary mt-5">
              <h5>Your Order</h5>
              <hr />
              <Row>
                <Col xs={6}>
            Product
                </Col>
                <Col className="text-right" xs={6}>
            Total
                </Col>
              </Row>
              <div className="order-products-container custom-scrollbar">
                {order.map((product, index) => (
                  <Row key={index}>
                    <Col xs={6}>
                      {`${product.listings_title} (${product.order_details_quantity})`}
                    </Col>
                    <Col className="text-right" xs={6}>
                      {`$${product.order_details_price_before_tax}`}
                    </Col>
                  </Row>
                ))}
              </div>
              <Row>
                <Col xs={6}>
            SUBTOTAL
                </Col>
                <Col className="text-right" xs={6}>
              $
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
            SHIPPING
                </Col>
                <Col className="text-right" xs={6}>
            FREE!
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
            TAX
                </Col>
                <Col className="text-right" xs={6}>
              $
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <strong>TOTAL</strong>
                </Col>
                <Col className="text-right" xs={6}>
                  <strong>
                $
                  </strong>
                </Col>
              </Row>
            </div>
          </>
        ) : ''
      );
    }
}

export default OrderDetails;

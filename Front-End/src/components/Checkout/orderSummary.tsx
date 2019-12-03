import React from 'react';
import {
  Row, Col, Button, Card,
} from 'react-bootstrap';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IListingDetails } from '../ListingDetails/ListingDetails';

interface IUserInfoTemp {
  id: number,
  username: string,
  email: string,
  first_name: string,
  last_name: string,
  brand_name: string,
  date_of_birth: string,
  phone_number: string,
  age: number,
  address_id: number,
  address: IAddressObj,
}

interface IAddressObj {
  id: number,
  street_name: string,
  street_number: number,
  unit_number: string,
  city: string,
  province: string,
  postal_code: string,
  country: string,
}

interface ICartItem {
  id: number,
  listing_id: number,
  user_id: number,
  quantity: number,
  listing: IListingDetails;
}

export interface IOrderData {
  userInfo: IUserInfoTemp;
  cartItems: ICartItem[],
  total_price_before_tax: number,
  total_tax: number,
  total_fee: number,
  total_price: number,
}

interface IStates {
}

interface IProps {
  data: IOrderData;
}

class OrderSummary extends React.Component<IProps, IStates> {
  public readonly state: Readonly<IStates> = {
  }

  public render() {
    const { data } = this.props;
    return (
      Object.values(data).length >= 1 ? (
        <div className="order-summary">
          <div className="text-center">
            <h5>Your Order</h5>
            <hr />
          </div>
          <Row>
            <Col xs={6}>
            Product
            </Col>
            <Col className="text-right" xs={6}>
            Total
            </Col>
          </Row>
          <div className="order-products-container custom-scrollbar">
            {data.cartItems.map((product) => (
              <Row key={product.id}>
                <Col xs={6}>
                  {`${product.listing.title} (${product.quantity})`}
                </Col>
                <Col className="text-right" xs={6}>
                  {`$${product.listing.price*product.quantity}`}
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
              {data.total_price_before_tax}
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
              {data.total_tax}
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <strong>TOTAL</strong>
            </Col>
            <Col className="text-right" xs={6}>
              <strong>
                $
                {data.total_price}
              </strong>
            </Col>
          </Row>
          <Card className="p-3 mb-4 order-paypal-info">
            <p>
              Pay via
              <FontAwesomeIcon icon={faPaypal} className="ml-2" />
            </p>
            <p>We currently only support purchasing through PayPal</p>
            <p>PayPal will take care of the transaction once you're ready to continue</p>
          </Card>

          <Button
            type="submit"
            className="btn-block btn-warning styled-button"
          >
          PROCEED TO PAYPAL
          </Button>
        </div>
      ) : ''
    );
  }
}

export default OrderSummary;

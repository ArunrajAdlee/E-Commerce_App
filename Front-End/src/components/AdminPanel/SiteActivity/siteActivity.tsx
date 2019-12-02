import React from 'react';
import {
  DropdownButton, Dropdown, Row, Col,
} from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { server, api } from '../../../server';
import ActivityCard from './activityCard';

interface ISaleAmounts {
    sum_price_before_tax: string;
    sum_price_after_tax: string;
    sum_listing_fee: string;
}

interface ITopSellers {
    order_details_seller_id: number;
    user_username: string;
    totalSum: string;
}

interface ISiteActivity {
    adClickCount: number;
    totalSaleAmounts: ISaleAmounts[];
    topSellers: ITopSellers[];
}

interface IStates {
    data: ISiteActivity,
}

interface IProps extends RouteComponentProps<any> {}

class SiteActivty extends React.Component<IProps, IStates> {
    public readonly state: Readonly<IStates> = {
      data: {} as ISiteActivity,
    }

    public async componentDidMount() {
      const { history } = this.props;
      try {
        const result = await server.get(api.admin_activity);

        if (result.data) {
          this.setState({ data: result.data });
        }
      } catch (e) {
        history.push('/');
      }
    }

    public render() {
      const { data } = this.state;
      return (
        Object.values(data).length >= 1
          ? (
            <div className="admin-activity">
              <h2 className="text-center">Site Activity</h2>
              <hr />
              <Row>
                <Col xl={4} className="mb-3">
                  <ActivityCard title="Total Sales (Before Tax)" description="Total amount from all website sales excluding tax" importantText={`$${data.totalSaleAmounts[0].sum_price_before_tax}`} />
                </Col>
                <Col xl={4} className="mb-3">
                  <ActivityCard title="Total Sales (After Tax)" description="Total amount from all website sales including tax" importantText={`$${data.totalSaleAmounts[0].sum_price_after_tax}`} />
                </Col>
                <Col xl={4} className="mb-3">
                  <ActivityCard title="Total Revenue" description="How much Bob has made from listing fees" importantText={`$${data.totalSaleAmounts[0].sum_listing_fee}`} />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col className="mb-3">
                  <ActivityCard title="Advertisement Click Count" description="How many times have users clicked on our ads" importantText={data.adClickCount} />
                </Col>
              </Row>
              <h2 className="text-center mt-5">Top Five Sellers</h2>
              <hr />
              <Row className="top-sellers-container">
                {data.topSellers.map((seller) => (
                  <Col key={seller.order_details_seller_id} lg={4} className="mb-3">
                    <ActivityCard title={`${seller.user_username}'s total from sales`} description={`Seller ID: ${seller.order_details_seller_id}`} importantText={`$${seller.totalSum}`} />
                  </Col>
                ))}
              </Row>
            </div>
          )
          : <></>
      );
    }
}

export default SiteActivty;

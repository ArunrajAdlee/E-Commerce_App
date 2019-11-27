import * as React from "react";
import SideNav from "./sideNav";
import { Container, Row, Col } from "react-bootstrap";
import UserInfo from "./userInfo";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { StoreContext } from "../../store";
import EditUserForm from "./editUserForm";

export interface UserDisplayProps {}

interface IProps extends RouteComponentProps<any> {}

export interface UserDisplayState {
  currentDisplay: number;
}

class UserDisplay extends React.Component<IProps, UserDisplayState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentDisplay: 1
    };
  }

  public handleNav = (id: number) => {
    let curr: number = this.state.currentDisplay;
    curr = id;
    this.setState({ currentDisplay: curr });
  };

  public handleEdit = () => {
    let curr: number = this.state.currentDisplay;
    curr = 5;
    this.setState({ currentDisplay: curr });
  };

  public render() {
    const { isAuth } = this.context;
    const { userInfo } = this.context;

    console.log("userDisplay", userInfo);

    let show: any;
    if (this.state.currentDisplay === 1) {
      show = (
        <UserInfo
          first_name={userInfo.first_name}
          last_name={userInfo.last_name}
          brand_name={userInfo.brand_name}
          phone_number={userInfo.phone_number}
          email={userInfo.email}
          username={userInfo.username}
          address={userInfo.address}
          handleEdit={this.handleEdit}
          street_name={userInfo.street_name}
          street_number={userInfo.street_number}
          unit_number={userInfo.unit_number}
          city={userInfo.city}
          province={userInfo.province}
          postal_code={userInfo.postal_code}
          country={userInfo.country}
        ></UserInfo>
      );
    } else if (this.state.currentDisplay === 2) {
      show = <p>Order History</p>;
    } else if (this.state.currentDisplay === 3) {
      show = <p>Listings</p>;
    } else if (this.state.currentDisplay === 4) {
      show = <p>Reviews</p>;
    } else {
      show = (
        <EditUserForm
          first_name={userInfo.first_name}
          last_name={userInfo.last_name}
          brand_name={userInfo.brand_name}
          phone_number={userInfo.phone_number}
          email={userInfo.email}
          username={userInfo.username}
          handleNav={this.handleNav}
          street_name={userInfo.street_name}
          street_number={userInfo.street_number}
          unit_number={userInfo.unit_number}
          city={userInfo.city}
          province={userInfo.province}
          postal_code={userInfo.postal_code}
          country={userInfo.country}
        ></EditUserForm>
      );
    }

    return !isAuth ? (
      <Redirect to="/" />
    ) : (
      <Container fluid>
        <Row>
          <Col>
            <h2> Welcome Back, {userInfo.first_name}</h2>
          </Col>
        </Row>
        <Row>
          {/* Options Card */}
          <Col md={12} lg={3} xs={12}>
            <SideNav handleNav={this.handleNav}></SideNav>
          </Col>
          {/*Info Display */}
          <Col md={12} lg={9} xs={12}>
            {show}
          </Col>
        </Row>
      </Container>
    );
  }
}
UserDisplay.contextType = StoreContext;
export default UserDisplay;

import * as React from 'react';
import { Container } from 'react-bootstrap';
import UserInfo from './userInfo';
import { StoreContext } from '../../store';
import EditUserForm from './editUserForm';

export interface IStates {
  displayEdit: boolean;
}

// Main Display of the user profile page
// Holds the components for side navigation bar, user info, order history, listings, and review history
class UserDisplay extends React.Component<{}, IStates> {
  public readonly state: Readonly<IStates> = {
    displayEdit: false,
  }

  // Used to toggle which display is showing
  public handleShowEdit = (isEdit: boolean) => {
    this.setState({ displayEdit: isEdit });
  };

  public render() {
    const { userInfo } = this.context;
    const { displayEdit } = this.state;
    return (
      <Container fluid className="user-info-container">
        {displayEdit ? (
          <EditUserForm
            first_name={userInfo.first_name}
            last_name={userInfo.last_name}
            brand_name={userInfo.brand_name}
            phone_number={userInfo.phone_number}
            email={userInfo.email}
            username={userInfo.username}
            handleShowEdit={this.handleShowEdit}
            street_name={userInfo.street_name}
            street_number={userInfo.street_number}
            unit_number={userInfo.unit_number}
            city={userInfo.city}
            province={userInfo.province}
            postal_code={userInfo.postal_code}
            country={userInfo.country}
          />
        )
          : (
            <UserInfo
              first_name={userInfo.first_name}
              last_name={userInfo.last_name}
              brand_name={userInfo.brand_name}
              phone_number={userInfo.phone_number}
              email={userInfo.email}
              username={userInfo.username}
              address={userInfo.address}
              handleShowEdit={this.handleShowEdit}
              street_name={userInfo.street_name}
              street_number={userInfo.street_number}
              unit_number={userInfo.unit_number}
              city={userInfo.city}
              province={userInfo.province}
              postal_code={userInfo.postal_code}
              country={userInfo.country}
            />
          )}
      </Container>
    );
  }
}
UserDisplay.contextType = StoreContext;
export default UserDisplay;

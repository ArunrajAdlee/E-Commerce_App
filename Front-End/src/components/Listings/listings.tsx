import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';

export interface Listing {
 id: number;
 name: string;

}

interface IProps {
  listings: Listing[];
}

interface IStates {

}

// Will finish when listings component is completed

class Listings extends React.Component<IProps, IStates> {
  public readonly state: Readonly<IStates> = {
  }

  public render() {
    const { listings } = this.props;
    return (
      <>
        {listings.length ? (
          <Row>
            <Col md={3} sm={12}>
              {
                 listings.map((listing) => (<p key={listing.id}>{listing.name}</p>))
             }
            </Col>
          </Row>
        )
          : <Spinner animation="border" variant="warning" />}
      </>
    );
  }
}

export default Listings;

import React from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

interface Listing {
 id: number;
 name: string;

}
interface IStates {
  listings: Listing[];
}

// Will finish when listings component is completed

class LatestListings extends React.Component<{}, IStates> {
  public readonly state: Readonly<IStates> = {
    listings: [],
  }

  public componentDidMount() {

  }

  public render() {
    const { listings } = this.state;
    return (
      <>
        <h2>Latest Listings</h2>
        <p>Check out the most recent products put on sale</p>
        <Row>
          <Col md={3} sm={12}>
            {
                 listings.map((listing) => (<p>{listing.name}</p>))
             }
          </Col>
        </Row>
      </>
    );
  }
}

export default LatestListings;

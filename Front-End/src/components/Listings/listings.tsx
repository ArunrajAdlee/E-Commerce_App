import React from 'react';
import { Row, Col } from 'react-bootstrap';

interface Listing {
 id: number;
 name: string;

}
interface IStates {
  listings: Listing[]
}

// Will finish when listings component is completed

class Listings extends React.Component<any, IStates> {
  public readonly state: Readonly<IStates> = {
    listings: this.props.listings
  }

  public componentDidMount() {
  }

  public render() {
    const { listings } = this.state;
    return (
      <>
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

export default Listings;

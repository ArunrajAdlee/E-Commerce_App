import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { server, api } from '../../server';
import { IListingDetails } from '../ListingDetails/ListingDetails';


interface IStates {
  advertListing: IListingDetails;
}

interface IProps extends RouteComponentProps<any> {}

class Advert extends React.Component<IProps, IStates> {
  public readonly state: Readonly<IStates> = {
    advertListing: {} as IListingDetails,
  };

  public async componentDidMount() {
    this.getAdvertListing();
  }

  public async componentDidUpdate() {
    const { match } = this.props;
    const { advertListing } = this.state;
    const { id } = match.params;
    if (advertListing.id && id === advertListing.id.toString()) {
      this.getAdvertListing();
    }
  }

  private getAdvertListing = async () => {
    const result = await server.get(api.ad_get);
    if (result.data) { this.setState({ advertListing: result.data.listing }); }
  }

  private incrementAdCounter = async () => {
    await server.post(`${api.ad_post}1`);
  }

  public render() {
    const { advertListing } = this.state;
    return (
      <Link to={`/listings/${advertListing.id}`} onClick={this.incrementAdCounter} className="advertisement-container">
        <Image className="image" src={advertListing.thumbnail} />
        <span className="helper title"><h4>{advertListing.title}</h4></span>
        <span className="helper price"><h4>{`$${advertListing.price}`}</h4></span>
        <Button variant="link" className="helper btn-link">
          <h4>
            <span>View Listing</span>
            <FontAwesomeIcon icon={faArrowRight} className="ml-4" />
          </h4>
        </Button>
      </Link>
    );
  }
}

export default Advert;

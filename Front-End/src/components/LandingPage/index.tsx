import React from 'react';
import { Carousel } from 'react-bootstrap';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IStates {
}

// Need class for API calls in future
class LandingPage extends React.Component<{}, IStates> {
    public readonly state: Readonly<IStates> = {
    }

    public render() {
      return (
        <div className="landing-banner">
          <Carousel indicators={false} interval={null} prevIcon={<FontAwesomeIcon color="black" icon={faArrowLeft} />} nextIcon={<FontAwesomeIcon color="black" icon={faArrowRight} />}>
            <Carousel.Item>
              <img
                className="d-block"
                src={require('../../assets/img/banner/banner-img.png')}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block "
                src={require('../../assets/img/banner/banner-img2.png')}
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block"
                src={require('../../assets/img/banner/banner-img3.png')}
                alt="Fourth slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block"
                src={require('../../assets/img/banner/banner-img4.png')}
                alt="Fifth slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      );
    }
}

export default LandingPage;

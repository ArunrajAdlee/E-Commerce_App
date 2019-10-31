import React from 'react'
import Image from 'react-bootstrap/Image'
import Carousel from 'react-bootstrap/Carousel'
import '../../../styles/sass/_listingdetails.scss'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



function ListingImage() {
    return (
        <div>
            <Carousel interval = {null} prevIcon={<FontAwesomeIcon color="black" icon={faArrowLeft} />} nextIcon={<FontAwesomeIcon color="black" icon={faArrowRight} />}>
                <Carousel.Item>
                    <Image className='listingImage' src='https://www.jib.co.th/img_master/product/original/2018082816074831217_1.jpg' />
                </Carousel.Item>
                <Carousel.Item>
                    <Image className='listingImage' src='https://ls1tech.com/forums/attachments/non-automotive-classifieds/305209d1310447805-xbox-360-slim-custom-halo-mod-w-blue-lights-picture-025.jpg' />
                </Carousel.Item>
                <Carousel.Item>
                    <Image className='listingImage' src='http://gmsdrums.com/wp-content/uploads/2012/02/gms-drumsGreen-Glass-SE-2008-014-Final-1024x685.jpg' />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default ListingImage
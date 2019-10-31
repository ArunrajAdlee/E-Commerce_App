import React from 'react'
import ListingDescription from './ListingDescription/ListingDescription'
import ListingImage from './ListingImage/ListingImage'
import ListingPurchaseDetails from './ListingPurchaseDetails/ListingPurchaseDetails'
import Media from 'react-bootstrap/Media'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function ListingDetails() {
    return (
        <div>
            <Media>
                <Container>
                    <Row>
                        <Col><ListingImage /></Col>
                        <Col>
                            <Media.Body>
                                <ListingPurchaseDetails />
                            </Media.Body>
                        </Col>
                    </Row>
                    <Row>
                        <Col><ListingDescription /></Col>
                    </Row>
                </Container>
            </Media>
        </div>
    )
}


export default ListingDetails
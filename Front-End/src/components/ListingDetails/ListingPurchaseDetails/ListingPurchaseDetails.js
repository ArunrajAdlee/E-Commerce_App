import React from 'react'
import Button from 'react-bootstrap/Button'

function ListingPurchaseDetails() {
    return (
        <div className='purchaseDetails'>
            <h1>Seller:</h1>
            <h1>Quantity:</h1>
            <h1>Price:</h1>
            <Button size='lg'>Add To Cart</Button>
        </div>
    )
}

export default ListingPurchaseDetails
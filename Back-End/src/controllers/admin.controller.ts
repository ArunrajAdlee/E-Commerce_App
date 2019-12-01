import { NextFunction, Request, Response } from 'express';
import { Listings } from '../entity/listings.entity';
import { getRepository } from 'typeorm';
import { AuthModel } from '../models/auth.model';
import { Ads } from '../entity/ads.entity';
import { OrderDetails } from '../entity/orderDetails.entity';
import { User } from '../entity/user.entity';
// tslint:disable-next-line
const { checkAuth } = require('../helpers/check-auth');

export class AdminController {

    
  async listings(req: Request, res: Response, next: NextFunction) {
    const authenticatedUser: AuthModel = checkAuth(req);
    if (!authenticatedUser) {
      res.status(404).send('user is not authenticated');
      return;
    }

    const listings = await getRepository(Listings)
      .createQueryBuilder('listings')
      .orderBy('listings.id', 'DESC')
      .getMany();

    res.status(200).send({
      listings: listings
    });
  }

  async siteActivity(req: Request, res: Response, next: NextFunction) {
    const ad = await getRepository(Ads).findOne(1);
    if (!ad) {
      res.status(404).send({
        message: 'error retrieving ad'
      });
      return;
    }

    const totalAmounts = await getRepository(OrderDetails).createQueryBuilder('order_details')
    .select(['SUM(price_before_tax) AS sum_price_before_tax', 
            'SUM(price_after_tax) AS sum_price_after_tax',
            'SUM(listing_fee) AS sum_listing_fee']
    ).getRawMany();

    console.log(totalAmounts);

    const highestOrders = await getRepository(OrderDetails).createQueryBuilder('order_details')
    .innerJoin(User, 'user', 'user.id = order_details.seller_id')
    .select(['order_details.seller_id', 'user.username', 'SUM(order_details.price_before_tax) AS totalSum'])
    .groupBy('order_details.seller_id')
    .orderBy('totalSum', 'DESC')
    .limit(10)
    .getRawMany();
    
   

// const user = await getRepository(User).createQueryBuilder("user")
//     .innerJoin(OrderDetails,  "orderDetails", "orderDetails.seller_id = user.id")
//     .select(['orderDetails.price_after_tax'])
//     .getRawMany();
//     console.log(user);

  }
}

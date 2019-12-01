import { NextFunction, Request, Response } from 'express';
import { Listings } from '../entity/listings.entity';
import { getRepository } from 'typeorm';
import { AuthModel } from '../models/auth.model';
import { Ads } from '../entity/ads.entity';
import { OrderDetails } from '../entity/orderDetails.entity';
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

    // const highestOrders = await getRepository(OrderDetails).createQueryBuilder('order_details')
    // .select('SUM(order_details.price_before_tax)', 'totalSumPerUser')
    // .groupBy('order_details.seller_id')
    // .orderBy('totalSumPerUser', 'DESC')
    // .getRawMany();

    // console.log(highestOrders);

  }
}

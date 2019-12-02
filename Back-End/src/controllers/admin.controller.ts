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

  async siteActivity(req: Request, res: Response, next: NextFunction) {
    const authenticatedUser: AuthModel = checkAuth(req);
    if (!authenticatedUser || !authenticatedUser.isAdmin) {
      res.status(404).send('user is not authenticated');
      return;
    }
    
    const ad = await getRepository(Ads).findOne(1);
    if (!ad) {
      res.status(404).send({
        message: 'error retrieving ad'
      });
      return;
    }

    const totalSaleAmounts = await getRepository(OrderDetails).createQueryBuilder('order_details')
    .select(['FORMAT(SUM(price_before_tax), 2) AS sum_price_before_tax', 
            'FORMAT(SUM(price_after_tax), 2) AS sum_price_after_tax',
            'FORMAT(SUM(listing_fee), 2) AS sum_listing_fee']
    ).getRawMany();

    const topSellers = await getRepository(OrderDetails).createQueryBuilder('order_details')
    .innerJoin(User, 'user', 'user.id = order_details.seller_id')
    .select(['order_details.seller_id', 'user.username', 'FORMAT(SUM(order_details.price_before_tax), 2) AS totalSum'])
    .groupBy('order_details.seller_id')
    .orderBy('totalSum', 'DESC')
    .limit(3)
    .getRawMany();

    topSellers.sort((a,b) => parseFloat(b.totalSum.replace(/,/g,'')) > parseFloat(a.totalSum.replace(/,/g,'')) ? 1: -1);

    res.status(200).send({
      adClickCount: ad.click_count,
      totalSaleAmounts: totalSaleAmounts,
      topSellers: topSellers
    });
  }
}
